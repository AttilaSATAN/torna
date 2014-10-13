'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Panelim = mongoose.model('Panelim'),
	_ = require('lodash');

/**
 * Create a Panelim
 */
exports.create = function(req, res) {
	var panelim = new Panelim(req.body);
	panelim.user = req.user;

	panelim.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(panelim);
		}
	});
};

/**
 * Show the current Panelim
 */
exports.read = function(req, res) {
	res.jsonp(req.panelim);
};

/**
 * Update a Panelim
 */
exports.update = function(req, res) {
	var panelim = req.panelim ;

	panelim = _.extend(panelim , req.body);

	panelim.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(panelim);
		}
	});
};

/**
 * Delete an Panelim
 */
exports.delete = function(req, res) {
	var panelim = req.panelim ;

	panelim.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(panelim);
		}
	});
};

/**
 * List of Panelims
 */
exports.list = function(req, res) { Panelim.find().sort('-created').populate('user', 'displayName').exec(function(err, panelims) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(panelims);
		}
	});
};

/**
 * Panelim middleware
 */
exports.panelimByID = function(req, res, next, id) { Panelim.findById(id).populate('user', 'displayName').exec(function(err, panelim) {
		if (err) return next(err);
		if (! panelim) return next(new Error('Failed to load Panelim ' + id));
		req.panelim = panelim ;
		next();
	});
};

/**
 * Panelim authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.panelim.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};