const passport = require('passport');
const LDAPStrategy = require('passport-ldapauth');
const ldapConfig = require('@config/ldap/ldap_config');
const models = require('@app/models');
const ldapUtils = require('@core/utils/ldap');
const language = require('@core/helpers/language');

passport.use(new LDAPStrategy({
	server: {
		url: ldapConfig.server.url,
		bindDN: ldapConfig.server.bindDn,
		bindCredentials: ldapConfig.server.bindSecret,
		searchBase: ldapConfig.userAuth.searchBase,
		searchFilter: ldapConfig.userAuth.searchFilter,
		groupSearchBase: ldapConfig.group.searchBase,
		groupSearchFilter: ldapConfig.group.searchFilterUserGroups /** If set, system will automatically get user groups **/
	},
	usernameField: 'login_user',
	passwordField: 'password_user',
	passReqToCallback: true // Allows us to pass back the entire request to the callback
	// handleErrorsAsFailures: true
}, (req, ldapUser, done) => {

	(async() => {
		// Check if ldap user exists
		let user = await models.E_user.findOne({
			where: {
				f_login: ldapUser[ldapConfig.userAuth.objectNameAttribute]
			},
			include: [{
				model: models.E_group,
				as: 'r_group'
			}, {
				model: models.E_role,
				as: 'r_role'
			}]
		});

		const ldapGroupsSettings = ldapUtils.getLdapGroupsSettings();

		// If user doesn't exist
		if (!user) {

			// Get ldap user group in local app using ldap group
			ldapUser._groups = typeof ldapUser._groups !== 'undefined' ? ldapUser._groups : [];

			let result;
			try {
				result = ldapUtils.getAppGroupsAndRoles(ldapUser);
			} catch (err) {
				console.error(err);
				throw new Error('login.ldap.access_denied');
			}

			const userToCreate = {
				f_enabled: 1
			};

			// Match LDAP information with app user column for user creation
			for (const item in ldapConfig.userAuth.ldapAttributesEqAppAttributes)
				if (ldapUser[item])
					userToCreate[ldapConfig.userAuth.ldapAttributesEqAppAttributes[item]] = ldapUser[item];

			try {
				user = await models.E_user.create(userToCreate);
			} catch (err) {
				console.error(err);
				throw new Error('login.ldap.create_user_error');
			}

			// No application group or role are defined for the created user, no access possible
			if (!result.groups.length || !result.roles.length)
				throw new Error("Votre compte a ??t?? cr??e mais vous n'avez pas encore d'acc??s, merci de contacter l'administrateur.");

			try {
				user = await ldapUtils.setUserGroupsAndRoles(user, result);
			} catch (err) {
				console.error(err);
				await user.destroy();
				throw new Error('login.ldap.update_group_role_failed');
			}

			if (!ldapUtils.haveAccess(ldapUser) && ldapGroupsSettings.give_access_to_all_groups !== 'true')
				throw new Error('login.ldap.access_denied');

		} else {

			if (!user.f_enabled)
				throw new Error('login.ldap.account_not_enabled');

			// Uncomment if LDAP groups is required for this application
			if (!ldapUser._groups.length)
				throw new Error('Votre utilisateur LDAP ne poss??de pas de groupe.');

			// Check if user have access
			if (ldapGroupsSettings.give_access_to_all_groups !== 'true' && !ldapUtils.haveAccess(ldapUser))
				throw new Error('Votre utilisateur LDAP ne poss??de pas le groupe n??cessaire pour se connecter.');

			// If update_user_group_on_login is enable, always get ldap user groups and update user groups and roles in app
			if (ldapGroupsSettings.update_user_groups_on_login == 'true') {
				let result;
				try {
					result = ldapUtils.getAppGroupsAndRoles(ldapUser);
				} catch (err) {
					console.error(err);
					throw new Error('login.ldap.authentication_failed');
				}

				if (!result.groups.length || !result.roles.length)
					throw new Error('login.ldap.access_denied');

				user = await ldapUtils.setUserGroupsAndRoles(user, result);

			} else if (user.r_group.length == 0 && user.r_role.length == 0) {
				throw new Error('login.ldap.access_denied');
			}
		}
	})().then(user => done(null, user)).catch(err => {
		console.error(err);
		req.flash('error', language(req.session.lang_user).__(err.message) || language(req.session.lang_user).__('login.ldap.authentication_failed'))
		return done(null, false);
	});
}));

passport.serializeUser(function(user_id, done) {
	done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user_id);
});

// exports.isLoggedIn = passport.authenticate('ldapauth', (err, user, info) => {
//     console.log(err);
//     console.log(user);
//     console.log(info);
// });

exports.isLoggedIn = passport.authenticate('ldapauth', {
	failureRedirect: '/login',
	failureFlash: true,
	failWithError: true,
	invalidCredentials: language('fr-FR').__('login.ldap.invalid_credentials'),
	badRequestMessage: language('fr-FR').__('login.ldap.bad_request_message')
});

exports.passport = passport;