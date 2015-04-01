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
	User.findById(userId).populate('itineraries invites').exec(function (err, user){
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

router.post('/removeInvite', function (req, res, next){
	//have userId, inviteId
	//remove id from user invites, remove auth from itinery
	console.log('remove', req.body);
	User.findByIdAndUpdate(req.body.userId._id, {$pull: {invites: req.body.inviteId}}, function (err, numUpdated){
		if(err) return next(err);
		console.log('updated user');
		Itinerary.findByIdAndUpdate(req.body.inviteId, {$pull: { users: req.body.userId._id}}, function (err, numUpdated2){
			if(err) return next(err);
			console.log('finished rejecting the invite');
			res.send(true);
		});
	});
});

router.post('/acceptInvite', function (req, res, next){
	//have userId, inviteId
	//remove id from user invites, remove auth from itinery
	console.log('accept', 'userId', req.body.userId._id, 'itineraryId', req.body.inviteId);
	User.findByIdAndUpdate(req.body.userId._id, { $pull: {invites: req.body.inviteId}}, function (err, numUpdated){
		if (err) return next(err);
		User.findByIdAndUpdate(req.body.userId._id, {$push: {itineraries: req.body.inviteId }}, function (err, numUpdated2){
			if(err) return next(err);
			console.log('finished accepting the invite');
			res.send(true);
		});
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

