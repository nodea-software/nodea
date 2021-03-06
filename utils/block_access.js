const models = require('../models/');
// Route middleware to make sure if user is identified
exports.isLoggedIn = function(req, res, next) {
	// If user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login?redirect=' + req.originalUrl);
};

// Route middleware to make sure if user is identified
exports.isAdmin = function(req, res, next) {
	// If user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		if(req.session.passport.user.id_role == 1)
			return next();

		req.session.toastr = [{
			message: "action.no_access_admin",
			level: "error"
		}];
		return res.redirect('/');
	}
	res.redirect('/login?redirect=' + req.originalUrl);
};

// Check access to specific application
exports.hasAccessApplication = function(req, res, next) {
	let app_name = null;
	if(req.params.app_name)
		app_name = req.params.app_name
	else if(req.query.app_name)
		app_name = req.query.app_name
	else
		app_name = req.session.app_name ? req.session.app_name : null;

	if (!req.isAuthenticated())
		return res.redirect('/login');

	if(!app_name)
		return next();

	// Check if application exist
	models.Application.findOne({
		where: {
			name: app_name
		}
	}).then(app => {
		if(!app)
			return res.redirect('/');
		// Check user access
		models.User.findOne({
			where: {
				id: req.session.passport.user.id
			},
			include: [{
				model: models.Application,
				required: true,
				where: {
					name: app_name
				}
			}]
		}).then(user => {
			if(!user){
				req.session.toastr = [{
					message: "application.no_access",
					level: "error"
				}];
				return res.redirect('/');
			}
			return next();
		})
	});

};

// If the user is already identified, he can't access the login page
exports.loginAccess = function(req, res, next) {
	// If user is not authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	res.redirect('/default/home');
};