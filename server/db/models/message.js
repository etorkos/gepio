var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema({
	user: String,
	message : String,
	date: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Message',messageSchema);