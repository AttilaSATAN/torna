'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var panelims = require('../../app/controllers/panelims');

	// Panelims Routes
	app.route('/panelims')
		.get(panelims.list)
		.post(users.requiresLogin, panelims.create);

	app.route('/panelims/:panelimId')
		.get(panelims.read)
		.put(users.requiresLogin, panelims.hasAuthorization, panelims.update)
		.delete(users.requiresLogin, panelims.hasAuthorization, panelims.delete);

	// Finish by binding the Panelim middleware
	app.param('panelimId', panelims.panelimByID);
};