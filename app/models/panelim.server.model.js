'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Panelim Schema
 */
var PanelimSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Panelim name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Panelim', PanelimSchema);