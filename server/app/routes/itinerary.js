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

router.put('/', function (req, res, next){
	Itinerary.findOneAndUpdate({_id: req.body._id}, req.body)
		.exec(function (err, itinerary){
			// console.log(itinerary);
			if (err) next (err);
			res.send(itinerary);
		});
});

router.get('/:id', function (req, res, next ){
	var itineraryId = req.params.id;
	// console.log('arrived here ok', itineraryId);
	Itinerary.findById(itineraryId, function(err, item){
		console.log('out of the search', 'item', item, 'err', err);
		res.json(item);
	});
});

router.delete('/:id', function (req, res, next){
	var itineraryId = req.params.id;
	Itinerary.findOneAndRemove(itineraryId, function(err, item){
		console.log('out of the search', 'item', item, 'err', err);
		res.sendStatus(200);
	});
});

router.post('/invite', function (req, res, next){
	var itineraryId = req.body.itineraryId;
	var userInvitee = req.body.userId;
	console.log('Info to Db');
	console.log('arguments', req.body);
	Itinerary.findById(itineraryId, function (err, itinerary){
		console.log('itinerary', itinerary, 'err', err);
		var resolved = false;
		itinerary.users.forEach(function(user){
			if (userInvitee === user) {
	    		resolved = true;
	    		res.send(false);
	    	}
		});
		if(!resolved){
			User.findById(userInvitee, function (err, user){
				if (err) return next(err);
				user.update({ $push: {invites: itineraryId}}, function (err, modCount){
					if (err) return next(err);
					itinerary.update({ $push: {users: userInvitee}}, function (err, modCount2){
						if (err) return next(err);
						res.send(true);
					});
					
				});
			});
		}
	});
});

router.post('/toggleSetting', function (req, res, next){
	var itineraryId = req.body.id;
	var newStatus = 'open';
	Itinerary.findById(itineraryId,function (err, itinerary){
		// console.log('itinerary', typeof itinerary.users.length, itinerary.users.length);
		if(itinerary.users.length === 0 ){ 
			// console.log('falsy...');
			res.status(200).send({status: newStatus});
		}
		else {
			if (itinerary.inviteStatus === 'open') { newStatus = 'closed'; }
			// console.log('newStatus', newStatus);
			Itinerary.findById(itineraryId).update({$set: {inviteStatus: newStatus}}, function (err,data){
				// console.log('err', err, 'data', newStatus);
				res.status(200).send({status: newStatus});
			});
		}
	});
	
});

router.put('/add', function (req, res){
	Itinerary.addEvents(req.body).then(function (result){
		res.json(result);
	});
});

router.put('/vote', function (req, res){
	Itinerary.findById(req.body.itinerary, function (err, itinerary){
		if (err) console.log(err);
		else {
			itinerary.updateVotes(req.body).then(function (data, error){
				if (error) console.log("ERROR", error);
				else {
					console.log(data);
					res.json(data);
				}
			});
		}
	});
});

router.put('/sort', function (req, res){
	Itinerary.replaceItinerary(req.body).then(function (data, error){
		if (error) console.log("ERROR", error)
		else {
			console.log(data);
			res.json(data);
		}
	});
});

router.put('/day', function (req, res){
	Itinerary.changeDay(req.body).then(function (result){
		// console.log("DAY CHANGED", result);
		res.json(result);
	});
});

module.exports = router;