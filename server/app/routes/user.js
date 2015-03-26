'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");

// api/user/
router.get('/:id/preferences',function (req, res, next){
	var id = req.params.id;
	User.findById(id, function (err, user){
		if(err) next(err);
		else res.json(user.preferences);
	});
});

router.post('/:id/preferences',function (req, res, next){
	var id = req.params.id;
	User.findById(id, function (err, user){
		if(err) next(err);
		else {
			user.preferences = req.body;
			user.save(function(){
				res.send("saved");
			});
		}
	});
});

router.put('/:id/preferences', function (req, res, next){
	User.findById(req.params.id, function (err, user){
		if (err) console.log(err);
		else {
			user.preferences.foods = req.body.foods;
			user.preferences.nights = req.body.nights;
			user.preferences.events = req.body.events;
			user.save(function (err, returned){
				if (err) console.log(err);
				else res.json(returned);
			});
		}
	});
});

module.exports = router;

