'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Aday = mongoose.model('Aday'),
	_ = require('lodash');

/**
 * Create a Aday
 */
exports.create = function(req, res) {
	var aday = new Aday(req.body);
	aday.user = req.user;

	aday.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aday);
		}
	});
};

/**
 * Show the current Aday
 */
exports.read = function(req, res) {
	res.jsonp(req.aday);
};

/**
 * Update a Aday
 */
exports.update = function(req, res) {
	var aday = req.aday ;

	aday = _.extend(aday , req.body);

	aday.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aday);
		}
	});
};

/**
 * Delete an Aday
 */
exports.delete = function(req, res) {
	var aday = req.aday ;

	aday.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aday);
		}
	});
};

/**
 * List of Adays
 */
exports.list = function(req, res) { Aday.find().sort('-created').populate('user', 'displayName').exec(function(err, adays) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(adays);
		}
	});
};

/**
 * Aday middleware
 */
exports.adayByID = function(req, res, next, id) { Aday.findById(id).populate('user', 'displayName').exec(function(err, aday) {
		if (err) return next(err);
		if (! aday) return next(new Error('Failed to load Aday ' + id));
		req.aday = aday ;
		next();
	});
};

/**
 * Aday authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.aday.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};