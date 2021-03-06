const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('@app/models');

// Default authentication strategy : passport.authenticate('local')
passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password',
	passReqToCallback: true // Allows us to pass back the entire request to the callback
}, function(req, login, password, done) {

	models.E_user.findOne({
		where: {f_login: login},
		include: [{
			model: models.E_group,
			as: 'r_group'
		}, {
			model: models.E_role,
			as: 'r_role'
		}]
	}).then(function(user) {

		function accessForbidden(msg){
			console.error('LOGIN ERROR => ' + msg);
			if(!req.session.loginAttempt)
				req.session.loginAttempt = 0;
			req.session.loginAttempt++;

			req.session.toastr = [{
				message: "login.login_fail",
				level: 'error'
			}];

			return done(null, false);
		}

		// Wrong captcha
		if(typeof req.session.loginCaptcha !== "undefined" && req.session.loginCaptcha && req.session.loginCaptcha != req.body.captcha)
			return accessForbidden("Le captcha saisi n'est pas correct.");

		// If the user doesn't exist
		if (!user)
			return accessForbidden("Nom d'utilisateur inexistant.");

		// If the user has no password
		if (user.f_password == "" || user.f_password == null)
			return accessForbidden('Compte non activé - Mot de passe manquant');

		// If the user is not enabled
		if (user.f_enabled == 0 || user.f_enabled == null)
			return accessForbidden('Compte non activé');

		// If the user is found but the password is wrong
		if (!bcrypt.compareSync(password, user.f_password))
			return accessForbidden('Mauvais mot de passe.');

		// Access authorized
		delete req.session.loginAttempt;

		return done(null, user);
	});
}));

passport.serializeUser(function(user_id, done) {
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user_id);
});

exports.isLoggedIn = passport.authenticate('local', {
	failureRedirect: '/login',
	badRequestMessage: "login.missing_infos",
	failureFlash: true
});

exports.passport = passport;