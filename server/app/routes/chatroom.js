'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Chatroom = mongoose.model("Chatroom");
var Message = mongoose.model("Message");
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

router.post('/message',function(req,res,next){
	//update message
	console.log(req.body);
	var id = req.body.room_id;
	var message = req.body.message; // this should contain user and message
	Chatroom.findById(id,function(err,chatroom){
		if(err) next(err);
		else if(chatroom == null) res.sendStatus(404);
		else{
			chatroom.messages.push(message);
			chatroom.save();
			res.sendStatus(200);
		}
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