'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Chatroom = mongoose.model("Chatroom");
var Message = mongoose.model("Message");

// api/chatroom/
router.get('/:id',function(req,res,next){
	var id = req.params.id;
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
		else res.sendStatus(200);
	})
});

router.post('/:id/message',function(req,res,next){
	//update message
	var id = req.params.id;
	var message = req.body.message;
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

module.exports = router;