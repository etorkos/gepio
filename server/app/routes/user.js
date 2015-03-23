'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");

// api/user/
router.get('/:id/preferences',function(req,res,next){
	var id = req.params.id;
	User.findById(id,function(err,user){
		if(err) next(err);
		else res.json(user.preferences);
	});
});

router.post('/:id/savepreferences',function(req,res,next){
	console.log(req.params);
	var id = req.params.id;
	User.findById(id,function(err,user){
		if(err) next(err);
		else {
			user.preferences = req.body;
			user.save(function(){
				res.send("saved");
			});
		}
	});
});

router.put('/', function (req, res, next){
	User.findOneAndUpdate({_id: req.body._id}, req.body, function (err,user){
		user.save(function(err, user){
			res.send(user);
		});
	});
});
module.exports = router;

