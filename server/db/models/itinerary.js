'use strict';
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var schema = new mongoose.Schema({
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	title: {type: String, required: true},
	type: String,
	date: {type: Date, dafault: Date.now},
	chosenEvents: [Event.schema],
	otherEvents: [{ event: [Event.schema], votes: Number }],
	otherVenues: [{ venue: [Event.schema], votes: Number }],
	chatRoom: {type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom'}
});

mongoose.model("Itinerary", schema);



// type string is used for routing on the front end (date_night, explore)
// likely will be removed with Eric's refactoring