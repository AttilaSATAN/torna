'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var adays = require('../../app/controllers/adays');

	// Adays Routes
	app.route('/adays')
		.get(adays.list)
		.post(users.requiresLogin, adays.create);

	app.route('/adays/:adayId')
		.get(adays.read)
		.put(users.requiresLogin, adays.hasAuthorization, adays.update)
		.delete(users.requiresLogin, adays.hasAuthorization, adays.delete);

	// Finish by binding the Aday middleware
	app.param('adayId', adays.adayByID);
};