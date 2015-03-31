'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var querystring = require("querystring");
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Itinerary = mongoose.model('Itinerary');

// api/user/
router.get('/:id/preferences',function (req, res, next){
	var id = req.params.id;
	User.findById(id, function (err, user){
		if(err) next(err);
		else res.json(user.preferences);
	});
});

router.get('/find/:first/:last', function (req, res, next){
	console.log('Conducting a user search');
	User.findOne({ firstName: req.params.first, lastName: req.params.last }).exec(function (err, user){
		console.log('user', user, 'err', err);
		if (err ) res.status(500).send(err);
		else if (user === null ) res.send({ _id: null });
		else res.send(user);
	})
})

router.get('/find/:email' , function (req, res, next){
	User.findOne({ email: req.params.email }).exec(function (err, user){
		if (err) return next(err);
		else if( user ===  null ) res.send({_id: null});
		else res.send(user);
	})
})

router.get('/:id/itineraries', function (req, res, next){
	var userId = req.user._id;
	// console.log('user ', userId, ' is requesting itinerary information');
	User.findById(userId).populate('itineraries').exec(function (err, user){
		if(err) next(err);
		else {
			// console.log('user information', user);
			var obj = { itineraries: user.itineraries, invites: user.invites};
			res.send(obj);
		}
	});
	// User.findById(userId).exec(function (err, user){
	// 	if (err) return next(err);
	// 	else{
	// 		console.log('user information', user);
	// 		var obj = { itineraries: user.itineraries, invites: user.invites};
	// 		res.send(obj);
	// 	}
	// });
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

