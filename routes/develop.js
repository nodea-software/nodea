const express = require('express');
const router = express.Router();
const block_access = require('../utils/block_access');
const helper = require('../utils/data_helper');
const models = require('../models/');
const code_platform = require('../services/code_platform');
const metadata = require('../database/metadata')();

router.get('/', block_access.hasAccessApplication, (req, res) => {

	if(req.query.app_name)
		req.session.app_name = req.query.app_name;

	(async() => {

		// Get all accessible application
		const applications = await models.Application.findAll({
			order: [
				['id', 'DESC']
			],
			include: [{
				model: models.User,
				as: "users",
				where: {
					id: req.session.passport.user.id
				},
				required: true
			}]
		});

		// Get all user for current app
		const appUsers = await models.User.findAll({
			include: [{
				model: models.Application,
				where: {
					name: req.session.app_name
				},
				required: true
			}]
		});

		// Code platform disabled
		if (!code_platform.config.enabled)
			return {
				currentApp: req.session.app_name,
				allApps: applications
			}

		if(!req.session.app_name)
			return {
				currentApp: req.session.app_name,
				allApps: applications
			}

		// Get current project last activities (commit)
		const metadataApp = metadata.getApplication(req.session.app_name);

		const projectCommits = await code_platform.getProjectCommits(metadataApp.repoID);
		const projectLabels = await code_platform.getProjectLabels(metadataApp.repoID);
		const projectTags = await code_platform.getProjectTags(metadataApp.repoID);

		// Show only last 10 commits
		const lastCommits = projectCommits.filter((x, idx) => idx < 10);

		return {
			projectID: metadataApp.repoID,
			currentApp: req.session.app_name,
			currentRepoUrl: metadataApp.codePlatformRepoHTTP.replace('.git', ''),
			allApps: applications,
			appUsers: appUsers,
			projectLabels: projectLabels,
			projectTags: projectTags,
			projectCommits: projectCommits,
			lastCommits: lastCommits
		}
	})().then(data => {
		res.render('front/develop/main', data);
	}).catch(err => {
		console.error(err);
		req.session.toastr = [{
			message: err.message || 'error.oops'
		}]
		res.render('front/develop/main');
	})
});

router.post('/new-issue', block_access.hasAccessApplication, (req, res) => {
	(async () => {
		// Get gitlab user from nodea user
		const assignToUsers = await models.User.findAll({
			where: {
				id: {
					[models.$in]: req.body.assignto
				}
			}
		});

		req.body.assignto = [];
		for (let i = 0; i < assignToUsers.length; i++) {
			// eslint-disable-next-line no-await-in-loop
			const user = await code_platform.getUser(assignToUsers[i]);
			req.body.assignto.push(user.id)
		}

		await code_platform.createIssue(req.body.projectID, {
			title: req.body.title,
			labels: req.body.labels,
			description: req.body.description,
			assignee_ids: req.body.assignto
		});
	})().then(_ => {
		res.status(200).send(true);
	}).catch(err => {
		console.error(err);
		res.status(500).send(err);
	})
});

router.post('/get-issues', block_access.hasAccessApplication, (req, res) => {
	(async () => {
		const issues = await code_platform.getProjectIssues(req.body.projectID, req.body.mytasks == 'true' ? req.session.code_platform.user.id : null);
		const data = [];
		for (let i = 0; i < issues.length; i++) {
			data.push({
				id: issues[i].id,
				title: issues[i].title,
				description: issues[i].description,
				created_at: issues[i].created_at,
				labels: issues[i].labels,
				assignees: issues[i].assignees[0] ? issues[i].assignees[0].name : '',
				state: issues[i].state,
				web_url: issues[i].web_url
			})
		}
		return data;
	})().then(data => {
		res.status(200).send({
			data: data
		});
	}).catch(err => {
		console.error(err);
		res.status(500).send(err);
	})
});

router.post('/new-tag', block_access.hasAccessApplication, (req, res) => {
	(async () => {
		req.body.title = helper.clearString(req.body.title).replace(/ /g, '_');

		if(!req.body.commit || req.body.commit == '')
			throw new Error('Missing commit ref for tag creation.');

		await code_platform.createTag(req.body.projectID, {
			tag_name: req.body.title,
			message: req.body.description,
			ref: req.body.commit
		});
	})().then(_ => {
		res.status(200).send(true);
	}).catch(err => {
		console.error(err);
		res.status(500).send(err);
	})
});

module.exports = router;