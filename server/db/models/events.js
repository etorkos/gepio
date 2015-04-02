'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: { type: String, required: true },
	description: String,
	location: {
		lat: Number,
		lon: Number
	}
}, { strict: false });

mongoose.model("Event", schema);