'use strict';
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var schema = new mongoose.Schema({
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	title: {type: String, required: true},
	type: String,
	date: {type: Date, dafault: Date.now},
	inviteStatus: { type: String, default: 'closed' },
	chosenEvents: [Event.schema],
	otherEvents: [{ event: [Event.schema], votes: Number }],
	otherVenues: [{ venue: [Event.schema], votes: Number }],
	chatRoom: {type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom'}
});

mongoose.model("Itinerary", schema);

schema.method.userExistsOrIsAdded = function(itineraryId, userId, cb) {
    this.users.forEach(function(userIdInDb){
    	if (userId === userIdInDb) {
    		return cb(null, null);
    	}
    });
	this.update({$push: {users: userId}}, function( err, newThis){
		return cb(err, newThis);
	});
}

// type string is used for routing on the front end (date_night, explore)
// likely will be removed with Eric's refactoring