'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Chatroom = mongoose.model("Chatroom");
var Message = mongoose.model("Message");
var Itinerary = mongoose.model("Itinerary");
var _ = require('lodash');

// api/chatroom/
router.get('/:id',function(req,res,next){
	var id = req.params.id;
	// console.log('into get');
	Chatroom.findById(id,function(err,chatroom){
		if(err) next(err);
		else res.json(chatroom);
	});
});

router.post('/create',function(req,res,next){
	var chatroom = req.body;
	var new_room = new Chatroom(chatroom);
	new_room.save(function(err){
		if(err) next(err);
		else res.send("saved");
	})
});

router.post('/getOrCreate', function (req, res, next){
	var itineraryId = req.body.id;
	Itinerary.findById(itineraryId, function (err, itinerary){
		if (err) return next(err);
		if (itinerary.chatroom){
			Chatroom.findById(itinerary.chatroom, function (err, myChatRoom){
				if (err) return next(err);
				myChatRoom.populate('messages', function (err, fullDoc){
					if(err) return next(err);
					else res.send(myChatRoom);
				});
			})
		}
		else {
			Chatroom.create({}, function (err, newChatRoom){
				if (err) return next(err);
				itinerary.chatroom = newChatRoom._id;
				itinerary.save(function (err, dunce){
					if(err) return next(err);
					res.send(newChatRoom);
				});	
			});
		}
	})
})

// router.post('/message', function(req,res,next){
// 	//update message
// 	console.log(req.body);
// 	var id = req.body.room_id;
// 	var message = req.body.message; // this should contain user and message
// 	Chatroom.findById(id,function(err,chatroom){
// 		if(err) next(err);
// 		else if(chatroom == null) res.sendStatus(404);
// 		else{
// 			chatroom.messages.push(message);
// 			chatroom.save();
// 			res.sendStatus(200);
// 		}
// 	});
// });

router.post('/message', function(req,res,next){
	//update message
	var id = req.body.room_id;
	var message = req.body.message;
	console.log('found messages');
	Message.create({user: req.user.id, message: message}, function (err, messageFromDb){
		if(err) return next(err);
		Chatroom.findById(id,function(err,chatroom){
			if(err) next(err);
			else if(chatroom == null) res.sendStatus(404);
			else {
				chatroom.messages.push(messageFromDb._id);
				chatroom.save();
				res.sendStatus(200);
			}
		});
	});
});

//upvote and downvote
router.post('/:id/vote',function(req,res,next){
	//update message
	var id = req.params.id;
	var event = req.body.event; // this should contain event and vote
	Chatroom.findById(id,function(err,chatroom){
		if(err) next(err);
		else if(chatroom == null) res.sendStatus(404);
		else{
			_.where(chatroom.events,{event : event.event})[0] + event.vote;
			chatroom.save();
		}
	});
});


module.exports = router;