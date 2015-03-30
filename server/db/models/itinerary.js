'use strict';
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	title: {type: String, required: true},
	type: String,
	date: {type: Date, dafault: Date.now},
	chosenEvents: [Event.schema],
	otherEvents: [{ event: [Event.schema], votes: Number }],
	otherVenues: [{ venue: [Event.schema], votes: Number }],
	chatRoom: {type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom'}
});


schema.methods.updateVotes = function (params){
	var self = this;
	return new Promise(function (resolve, reject){
		var search;
		if (params.type === 'venue') search = { set: self.otherVenues, property: 'venue' };
		else search = { set: self.otherEvents, property: 'event' };
		var property = search.property;
		var changed;
		for (var i = 0; i < search.set.length; i++){
			if (search.set[i][property][0].title == params.name){
				changed = search.set[i];
				search.set[i].votes = params.votes;
				break;
			} 
		}
		if (params.type === 'venue') self.otherVenues = search.set;
		else self.otherEvents = search.set;
		return self.save(function (err, itinerary){
			if (err) reject(err);
			else resolve({ type: search.property, item: changed });
		});
	});
}

schema.methods.setOtherData = function (data){
	var self = this;
	return new Promise(function (resolve, reject){
		var embedVenues = [];
		var embedEvents = [];
		for (var key in data){
			if (data.hasOwnProperty(key)){
				if (key == 'venues'){
					data[key].forEach(function (venue){
						var embed = new Event();
						embed.title = venue.name;
						embed.description = venue.category.name;
						embed.location = { lat: venue.location.lat, lon: venue.location.lon };
						embedVenues.push({ venue: embed, votes: 0});
					});
				}
				else {
					data[key].forEach(function (event){
						if( event.name !== 'test'){ 
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
		if (embedEvents.length > 0) self.otherEvents = embedEvents;
		if (embedVenues.length > 0) self.otherVenues = embedVenues;
		return self.save(function (err, itinerary){
			if (err) reject(err);
			else resolve(itinerary);
		});
	});
}

mongoose.model("Itinerary", schema);



// type string is used for routing on the front end (date_night, explore)
// likely will be removed with Eric's refactoring