'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');
var User = mongoose.model('User');
var Event = mongoose.model('Event');

router.post('/', function(req, res, next){
	console.log('Got to itinerary post with', req.body.user);
	var user = req.body.user ? req.body.user._id : null;
	var title = req.body.title;
	var type = req.body.type;
	Itinerary.create({users: [user], title: title, type: type}, function(err, itinerary){
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
		res.send(item);
	})
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