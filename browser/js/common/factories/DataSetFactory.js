'use strict';
app.factory('DataSetFactory', function (POIFactory){
	var factory = {};
	factory.events = undefined;
	factory.venues = undefined;
	factory.movies = undefined;
	factory.genericVenues = undefined;
	factory.genericEvents = undefined;
	factory.setUnmodifiedItinerary = function(){
		factory.events = factory.genericEvents;
		factory.venues = factory.genericVenues;
		console.log("SET GENERIC", { events: factory.events, venues: factory.venues });
	}
	factory.insertAndUpdate = function (venues, events){
		factory.venues = factory.genericVenues;
		factory.events = factory.genericEvents;
		console.log('called insertAndUpdate');
		var venueData = [];
		venues.forEach(function (venue){
			var data = {};
			 console.log('factory.venues', factory, 'venue', venue);
			if(factory.venues){ 
				//if we have generated new events before pulling from the server
				for (var i = 0; i < factory.venues.length; i++){
					if (factory.venues[i].name === venue.venue[0].title){
						for (var key in factory.venues[i]){
							if (factory.venues[i].hasOwnProperty(key)){
								data[key] = factory.venues[i][key];
							}
						}
						factory.venues.splice(i, 1);
						break;
					}
				}
				data.votes = venue.votes;
				venueData.push(data);
			}
			else {
				//if the server data loads first AKA load directly to itinerary page
				venueData.concat(venue)
			}
		});
		var eventData = [];
		events.forEach(function (event){
			var data = {};
			for (var i = 0; i < factory.events.length; i++){
				if (factory.events[i].name === event.event[0].title){
					for (var key in factory.events[i]){
						if (factory.events[i].hasOwnProperty(key)){
							data[key] = factory.events[i][key];
						}
					}
					factory.events.splice(i, 1);
					break;
				}
			}
			data.votes = event.votes;
			eventData.push(data);
		});
		for (var i = venueData.length; i > 0; i--){
			factory.venues.unshift(venueData[i-1]);
		}
		for (var i = eventData.length; i > 0; i--){
			factory.events.unshift(eventData[i-1]);
		}
		console.log("SET MODIFIED", { events: factory.events, venues: factory.venues });
	};
	factory.isNew = false;
	return factory;
});
