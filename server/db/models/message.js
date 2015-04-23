var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	message : { type: String, required: true }, 
	date: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Message',messageSchema);
