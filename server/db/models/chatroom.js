var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatRoomSchema = new mongoose.Schema({
	name : String,
	messages :[{
		type : Schema.Types.ObjectId, ref: 'Message'
	}]
});

var messageSchema = new mongoose.Schema({
	user: String,
	message : String,
	date: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Chatroom',chatRoomSchema);
mongoose.model('Message',messageSchema);
