var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	users: {type: [String], required: true},
	title: {type: String, required: true},
	events: [{
		type: String,
		options: [],
		time: Date}]
});

mongoose.model("Itinerary", schema);