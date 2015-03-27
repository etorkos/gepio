var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
	users : [{
		type : Schema.Types.ObjectId, 
		ref: 'Message',
		required : true
	}],
	title: {type: String, required: true},
	events: [{
		type: String,
		options: [],
		time: Date}]
});

mongoose.model("Itinerary", schema);