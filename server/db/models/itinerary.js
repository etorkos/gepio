var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	users: {type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true},
	title: {type: String, required: true},
	type: String,
	date: {type: Date(), dafault: newDate()},
	chosenEvents: [{
		title: String,
		location: [{
			lat: Number,
			lon: Number  }],
		description: String,
	}]
	otherEvents: [{
		title: String,
		description: String,
		location: [{
			lat: Number,
			lon: Number  }],
		votes: [{
			voter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
			upvote: boolean }],
		}],
	chatRoom: {type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom'}
});

mongoose.model("Itinerary", schema);

// type string is used for routing on the front end (date_night, explore)
// likely will be removed with Eric's refactoring