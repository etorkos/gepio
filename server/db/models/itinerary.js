'use strict';
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
	users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	title: {type: String, required: true},
	type: String,
	date: {type: Date, dafault: Date.now},
	inviteStatus: { type: String, default: 'closed' },
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
						embed.location = { lat: venue.location.lat, lon: venue.location.lng };
						embedVenues.push({ venue: embed, votes: 0});
					});
				}
				else {
					data[key].forEach(function (event){
						if (event.name !== 'test'){ 
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

schema.statics.addEvents = function (data){
	var self = this;
	return new Promise(function (resolve, reject){
		self.findById(data.id, function (err, itinerary){
			if (err) reject(err);
			else {
				var events = [];
				for (var i = 0; i < data.data.length; i++){
					if (data.data[i].name !== 'test'){
						var embed = new Event();
						embed.title = data.data[i].name;
						embed.description = data.data[i].description.text;
						embed.location = { lat: data.data[i].venue.latitude, lon: data.data[i].venue.longitude };
						events.push({ event: embed, votes: 0 });
					}
					if (itinerary.otherEvents.length + events.length >= 8) break;
				}
				var currentEvents = itinerary.otherEvents;
				currentEvents = currentEvents.concat(events);
				itinerary.otherEvents = currentEvents;
				return itinerary.save(function (err, saved){
					if (err) reject(err);
					else resolve(saved);
				});
			}
		});
	});
}

schema.statics.changeDay = function (data){
	var self = this;
	return new Promise(function (resolve, reject){
		self.findById(data.id, function (err, itinerary){
			if (err) reject(err);
			else {
				var events = [];
				for (var i = 0; i < data.data.length; i++){
					if (data.data[i].name !== 'test'){
						var embed = new Event();
						embed.title = data.data[i].name;
						embed.description = data.data[i].description.text;
						embed.location = { lat: data.data[i].venue.latitude, lon: data.data[i].venue.longitude };
						events.push({ event: embed, votes: 0 });
					}
					if (events.length >= 8) break;
				}
				itinerary.otherEvents = events;
				return itinerary.save(function (err, saved){
					if (err) reject(err);
					else resolve(saved);
				});
			}
		});
	});
}

mongoose.model("Itinerary", schema);

// type string is used for routing on the front end (date_night, explore)
// likely will be removed with Eric's refactoring