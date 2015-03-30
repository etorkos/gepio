var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatRoomSchema = new mongoose.Schema({
	name : String,
	messages :[{
		type : Schema.Types.ObjectId, ref: 'Message'
	}],
	events : [{
		name : String,
		vote_counts : { type:Number, default:0 }
	}]
});

mongoose.model('Chatroom',chatRoomSchema);

