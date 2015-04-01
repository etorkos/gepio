'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');
var User = mongoose.model('User');
var Event = mongoose.model('Event');

router.post('/', function(req, res, next){
	console.log('Got to itinerary post with', req.body.user);
	var user = req.body.user ? req.body.user._id : undefined;
	var obj = {};
	obj.title = req.body.title;
	obj.type = req.body.type;
	obj.date = new Date();
	if (user) obj.user = user;
	Itinerary.create(obj, function(err, itinerary){
		if (err) res.status(500).send(err);
		else {
			itinerary.setOtherData(req.body.events).then(function (itin){
				console.log("USER", user);
				if (!user) res.status(200).send(itin);
				else {
					User.findByIdAndUpdate(user, { $push: { itineraries: itin._id } }, function (err, user){
						if (err) res.status(500).send(err);
						else res.status(200).send(itin);
					});
				}
			});
		}
	});	
});

router.get('/:id', function (req, res, next ){
	var itineraryId = req.params.id;
	console.log('arrived here ok', itineraryId);
	Itinerary.findById(itineraryId, function(err, item){
		console.log('out of the search', 'item', item, 'err', err);
		res.json(item);
	})
});

router.post('/invite', function (req, res, next){
	var itineraryId = req.body.id;
	var userInvitee = req.body.userId;
	Itinerary.userExistsOrIsAdded(itineraryId, userInvitee, function(err, response){
		if (err) return next(err);
		if (response) {
			User.findById(userInvitee, function (err, user){
				user.update({$push: { invites: response._id }}, function (err, user){
					res.send(response);
				});
			});
		}
		else res.send( null );
	});
})

router.post('/toggleSetting', function (req, res, next){
	var itineraryId = req.body.id;
	var newStatus = 'open';
	console.log(req.body);
	Itinerary.findById(itineraryId).exec(function (err,itinerary){
		console.log('itinerary', itinerary, 'err', err);
		if (itinerary.inviteStatus === 'open') { newStatus = 'closed'; }
		console.log('newStatus', newStatus);
		Itinerary.findById(itineraryId).update({$set: {inviteStatus: newStatus}}, function (err,data){
			console.log('err', err, 'data', newStatus);
			res.send(newStatus);
		});
	});
	
})

router.put('/add', function (req, res){
	Itinerary.addEvents(req.body).then(function (result){
		res.json(result);
	});
});

router.put('/vote', function (req, res){
	Itinerary.findById(req.body.itinerary, function (err, itinerary){

		if (err) console.log(err);
		else {
			itinerary.updateVotes(req.body).then(function (data){
				console.log(data);
				res.json(data);
			});
		}
	});
});

router.put('/day', function (req, res){
	Itinerary.changeDay(req.body).then(function (result){
		console.log("DAY CHANGED", result);
		res.json(result);
	});
});

module.exports = router;