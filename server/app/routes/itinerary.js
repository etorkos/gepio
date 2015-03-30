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
	Itinerary.create({users: [user], title: title, type: type}, function(err, itinerary){
		if (err) res.status(500).send(err);
		else {
			itinerary.setOtherData(req.body.events).then(function (itin){
				if (user === 'tempUser') res.status(200).send(itin);
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

// router.put('/update', function (req, res){
// 	var data = [];
// 	console.log("Req", req.body);
// 	Itinerary.findById(req.body.id, function (err, itinerary){
// 		if (err) console.log(err);
// 		else {
// 			if (req.body.type == 'venues') {
// 				for (var i = 0; i < 8; i++){
// 					var alreadyExists = false;
// 					var otherVenuesIndex;
// 					itinerary.otherVenues.forEach(function (venue, index){
// 						if (venue.name == req.body.data[i].name){
// 							alreadyExists = true;	
// 							otherVenuesIndex = index;
// 						} 
// 					});
// 					var embed = new Event();
// 					embed.title = req.body.data[i].name;
// 					embed.description = req.body.data[i].category.name;
// 					embed.location = { lat: req.body.data[i].location.lat, lon: req.body.data[i].location.lon };
// 					if (!alreadyExists) data.push({ venue: embed, votes: 0 });
// 					else data.push({ venue: embed, votes: itinerary.otherVenues[otherVenuesIndex].votes });
// 				}
// 				itinerary.otherVenues = data;
// 				itinerary.save(function (err, returned){
// 					if (err) console.log(err);
// 					else {
// 						console.log(returned);
// 						return returned;
// 					}
// 				});
// 			}
// 			else {
// 				for (var i = 0; i < 8; i++){
// 					var alreadyExists = false;
// 					var otherEventsIndex;
// 					itinerary.otherEvents.forEach(function (event, index){
// 						if (event.name == req.body.data[i].name){
// 							alreadyExists = true;	
// 							otherEventsIndex = index;
// 						} 
// 					});
// 					var embed = new Event();
// 					embed.title = req.body.data[i].name;
// 					embed.description = req.body.data[i].description.text;
// 					embed.location = { lat: req.body.data[i].venue.latitude, lon: req.body.data[i].venue.longitude };
// 					if (!alreadyExists) data.push({ event: embed, votes: 0 });
// 					else data.push({ venue: embed, votes: itinerary.otherEvents[otherEventsIndex].votes });
// 				}
// 				itinerary.otherEvents = data;
// 				itinerary.save(function (err, returned){
// 					if (err) console.log(err);
// 					else {
// 						console.log(returned);
// 						return returned;
// 					}
// 				});
// 			}
// 		}
// 	});
// });

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

module.exports = router;