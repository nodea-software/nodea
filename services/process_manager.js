const globalConf = require('../config/global.js');
const spawn = require('cross-spawn');
const psTree = require('ps-tree');
const fs = require("fs-extra");
const path = require('path');
const fetch = require('node-fetch');
const AnsiToHTML = require('ansi-to-html');
const ansiToHtml = new AnsiToHTML();
const moment = require('moment');
const childsUrlsStorage = {};
const process_server_per_app = [];
let process_server = null;

function setDefaultChildUrl(sessionID, appName){
	if(typeof childsUrlsStorage[sessionID] === "undefined")
		childsUrlsStorage[sessionID] = {};
	if(typeof childsUrlsStorage[sessionID][appName] === "undefined")
		childsUrlsStorage[sessionID][appName] = "";
}

function setChildUrl(sessionID, appName, url){
	setDefaultChildUrl(sessionID, appName);
	childsUrlsStorage[sessionID][appName] = url;
}
exports.setChildUrl = setChildUrl;

exports.process_server_per_app = process_server_per_app;

exports.launchChildProcess = function(req, appName, env) {

	setDefaultChildUrl(req.sessionID, appName);

	process_server = spawn('node', [__dirname + "/../workspace/" + appName + "/server.js", 'autologin'], {
		CREATE_NO_WINDOW: true,
		env: env
	});

	/* Generate app logs in /workspace/logs folder */
	fs.mkdirsSync(__dirname + "/../workspace/logs/");
	const allLogStream = fs.createWriteStream(path.join(__dirname + "/../workspace/logs/", 'app_' + appName + '.log'), {
		flags: 'a'
	});

	process_server.stdout.on('data', function(data) {
		data = data.toString();
		// Check for child process log specifying current url. child_url will then be used to redirect
		// child process after restart
		if (data.indexOf("IFRAME_URL") != -1) {
			if (data.indexOf("/status") == -1){
				childsUrlsStorage[req.sessionID][appName] = data.split('::')[1];
			}
		} else {
			const cleaned = data.replace(/(.*)\n*$/, '$1');
			if (!cleaned.length)
				return;
			allLogStream.write('<span style="color:#00ffff;">' + moment().format("YYYY-MM-DD HH:mm:ss-SSS") + ':</span>  ' + ansiToHtml.toHtml(cleaned) + '\n');
			console.log('\x1b[36m%s\x1b[0m', appName + ' ' + moment().format("YYYY-MM-DD HH:mm:ss-SSS") + ': ' + cleaned);
		}
	});

	process_server.stderr.on('data', function(data) {
		data = data.toString();
		allLogStream.write('<span style="color: red;">'+moment().format("YYYY-MM-DD HH:mm:ss-SSS")+':</span>  ' + ansiToHtml.toHtml(data) + '\n');
		console.log('\x1b[31m%s\x1b[0m', 'Err '+appName+' '+moment().format("YYYY-MM-DD HH:mm:ss-SSS")+': ' + data.replace(/(.*)\n*$/, '$1'));
	});

	process_server.on('close', _ => {
		if (allLogStream)
			allLogStream.end();
		console.log('\x1b[31m%s\x1b[0m', 'Child process exited');
	});

	exports.process_server = process_server;
	return process_server;
}

async function checkServer(iframe_url, initialTimestamp, timeoutServer) {

	// Server Timeout
	if (new Date().getTime() - initialTimestamp > timeoutServer) {
		console.error('Timeout server on url => ' + iframe_url);
		throw new Error('preview.server_timeout');
	}

	let response;
	try {
		response = await fetch(iframe_url, {
			method: "GET"
		});
	} catch(err) {
		return await checkServer(iframe_url, initialTimestamp, timeoutServer);
	}

	// Default server error: 502 Bad Gateway - Mean no server response
	if(typeof response === 'undefined' || response.status == 502)
		return await checkServer(iframe_url, initialTimestamp, timeoutServer);

	// Unusual error, log it
	if (response.status != 200) {
		console.warn('Server not ready - Invalid Status Code Returned:', response.status);
		return await checkServer(iframe_url, initialTimestamp, timeoutServer);
	}

	// Everything's ok
	console.log("Server status is OK");
	return true;
}
exports.checkServer = checkServer;

exports.childUrl = (req, appID) => {

	setDefaultChildUrl(req.sessionID, req.session.app_name);

	let url = globalConf.protocol + '://' + globalConf.host + ':' + (9000 + parseInt(appID)) + childsUrlsStorage[req.sessionID][req.session.app_name];
	if (globalConf.env == 'studio')
		url = 'https://' + globalConf.sub_domain + '-' + req.session.app_name.substring(2) + "." + globalConf.dns + childsUrlsStorage[req.sessionID][req.session.app_name];

	return url;
}

const cp = require('child_process');
exports.killChildProcess = (pid) => new Promise(resolve => {
	console.log("Killed child process was called : " + pid);
	// OS is Windows
	const isWin = /^win/.test(process.platform);
	if (isWin) {
		// **** Commands that works fine on WINDOWS ***
		cp.exec('taskkill /PID ' + process_server.pid + ' /T /F', err => {
			if(err)
				console.error(err);
			console.log("Killed child process");
			exports.process_server = null;
			resolve();
		});
	} else {
		/* Kill all the differents child process */
		const killTree = true;
		if (killTree) {
			psTree(pid, function(err, children) {
				if(err)
					console.error(err);

				const pidArray = [pid].concat(children.map(p => p.PID));

				for (let i = 0; i < pidArray.length; i++) {
					try {
						console.log("TPID : " + pidArray[i]);
						process.kill(pidArray[i], 'SIGKILL');
					} catch(err) {
						console.error("Cannot kill process with pid " + pidArray[i]);
					}
				}
				resolve();
			});
		} else {
			try {
				/* Kill just one child */
				process.kill(pid, 'SIGKILL');
			} catch(err) {
				console.error("Cannot kill process with pid " + pid);
			}
			resolve();
		}
	}
})

module.exports = exports;