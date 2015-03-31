'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');
var User = mongoose.model('User');
var Event = mongoose.model('Event');

router.post('/', function(req, res, next){
	console.log('Got to itinerary post with', req.body.user);
	var user = req.body.user._id || 'tempUser' ; //want name as a string
	var title = req.body.title;
	var type = req.body.type;
	var embedVenues = [];
	var embedEvents = [];
	Itinerary.create({users: [user], title: title, type: type}, function(err, itinerary){
		if (err) res.status(500).send(err);
		else {
			for (var key in req.body.events){
				if (req.body.events.hasOwnProperty(key)){
					if (key == 'venues'){
						req.body.events[key].forEach(function (venue){
							var embed = new Event();
							embed.title = venue.name;
							embed.description = venue.category.name;
							embed.location = { lat: venue.location.lat, lon: venue.location.lon };
							embedVenues.push({ venue: embed, votes: 0});
						});
					}
					else {
						req.body.events[key].forEach(function (event){
							console.log(event)
							if( event.name !== 'test'){ 
								console.log(event);
								var embed = new Event();
								embed.title = event.name;
								embed.description = event.description.text;
								embed.location = { lat: event.venue.latitude, lon: event.venue.longitude };
								embedEvents.push({ event: embed, votes: 0});
							}
						});
					}
				}
			}
			if (embedEvents.length > 0) itinerary.otherEvents = embedEvents;
			if (embedVenues.length > 0) itinerary.otherVenues = embedVenues;
			itinerary.save(function (err, returned){
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				else {
					if (user == 'tempUser') res.status(200).send(returned);
					else {
						User.findOneAndUpdate( {'_id': user}, { $push: { itineraries: returned._id }}, function(err, user){
							if(err) res.status(500).send(err);
							console.log('enduser', user);
							res.status(200).send(returned);
						});
					}
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

router.put('/update', function (req, res){
	var data = [];
	console.log("Req", req.body);
	Itinerary.findById(req.body.id, function (err, itinerary){
		if (err) console.log(err);
		else {
			if (req.body.type == 'venues') {
				for (var i = 0; i < 8; i++){
					var alreadyExists = false;
					var otherVenuesIndex;
					itinerary.otherVenues.forEach(function (venue, index){
						if (venue.name == req.body.data[i].name){
							alreadyExists = true;	
							otherVenuesIndex = index;
						} 
					});
					var embed = new Event();
					embed.title = req.body.data[i].name;
					embed.description = req.body.data[i].category.name;
					embed.location = { lat: req.body.data[i].location.lat, lon: req.body.data[i].location.lon };
					if (!alreadyExists) data.push({ venue: embed, votes: 0 });
					else data.push({ venue: embed, votes: itinerary.otherVenues[otherVenuesIndex].votes });
				}
				itinerary.otherVenues = data;
				itinerary.save(function (err, returned){
					if (err) console.log(err);
					else {
						console.log(returned);
						return returned;
					}
				});
			}
			else {
				for (var i = 0; i < 8; i++){
					var alreadyExists = false;
					var otherEventsIndex;
					itinerary.otherEvents.forEach(function (event, index){
						if (event.name == req.body.data[i].name){
							alreadyExists = true;	
							otherEventsIndex = index;
						} 
					});
					var embed = new Event();
					embed.title = req.body.data[i].name;
					embed.description = req.body.data[i].description.text;
					embed.location = { lat: req.body.data[i].venue.latitude, lon: req.body.data[i].venue.longitude };
					if (!alreadyExists) data.push({ event: embed, votes: 0 });
					else data.push({ venue: embed, votes: itinerary.otherEvents[otherEventsIndex].votes });
				}
				itinerary.otherEvents = data;
				itinerary.save(function (err, returned){
					if (err) console.log(err);
					else {
						console.log(returned);
						return returned;
					}
				});
			}
		}
	})
});

module.exports = router;