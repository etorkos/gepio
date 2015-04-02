'use strict';
app.factory('DataSetFactory', function (POIFactory, $rootScope, $q){
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
	};
	factory.reorderData = function (item){
		var item = item;
		return $q(function (resolve, reject){
			var type = item.type + 's';
			var max = 0;
			var min = 0;
			for (var i = 0; i < factory[type].length; i++){
				if (factory[type][i].name == item.name){
					factory[type][i].votes = item.votes;
				}
				if (factory[type][i].votes > max) max = factory[type][i].votes;
				if (factory[type][i].votes < min) min = factory[type][i].votes;
			}
			var sorted = [];
			while (max >= min){
				for (var i = 0; i < factory[type].length; i++){
					if (factory[type][i].votes == max) {
						sorted.push(factory[type][i]);
					}
				}
				max--;
			}
			for (var i = 0; i < factory[type].length; i++){
				factory[type][i] = sorted[i];
			}
			console.log('reorderData ', factory[type]);
			resolve({ type: item.type, data: factory[type] }); //passing entire dataSet back
		});
	};
	factory.insertAndUpdate = function (venues, events){
		factory.venues = factory.genericVenues;
		factory.events = factory.genericEvents;
		console.log('called insertAndUpdate');
		var venueData = [];
		var eventData = [];
		venues.forEach(function(venue){ //we are no longer filtering after, we need to filter before
			var thing = venue.venue[0];
			thing.name = thing.title;
			thing.votes = venue.votes;
			venueData.push(thing);
		});
		events.forEach(function(event){
			console.log(event);
			var thing = event.event[0];
			thing.name = thing.title;
			thing.votes = venue.votes;
			venueData.push(thing);
			
		// console.log("FROM DATABASE", venues, events);
		// var venueData = [];
		// venues.forEach(function (venue){
		// 	var data = {};
		// 	for (var i = 0; i < factory.venues.length; i++){	
		// 		if (factory.venues[i].name === venue.venue[0].title){
		// 			for (var key in factory.venues[i]){
		// 				if (factory.venues[i].hasOwnProperty(key)){
		// 					data[key] = factory.venues[i][key];
		// 				}
		// 			}
		// 			factory.venues.splice(i, 1);
		// 			break;
		// 		}
		// 	}
		// 	if (!data.name){
		// 		data.name = venue.venue[0].title;
		// 		data.location = { lat: venue.venue[0].location.lat, lng: venue.venue[0].location.lon };
		// 	}
		// 	data.votes = venue.votes;
		// 	venueData.push(data);
		// });
		// var eventData = [];
		// events.forEach(function (event){
		// 	var data = {};
		// 	for (var i = 0; i < factory.events.length; i++){
		// 		if (factory.events[i].name === event.event[0].title){
		// 			for (var key in factory.events[i]){
		// 				if (factory.events[i].hasOwnProperty(key)){
		// 					data[key] = factory.events[i][key];
		// 				}
		// 			}
		// 			factory.events.splice(i, 1);
		// 			break;
		// 		}
		// 	}
		// 	if (!data.name){
		// 		data.name = event.event[0].title;
		// 		data.venue = { latitude: event.event[0].location.lat, longitude: event.event[0].location.lon };
		// 	}
		// 	data.votes = event.votes;
		// 	eventData.push(data);
		// });
		for (var i = venueData.length; i > 0; i--){
			if(!factory.venues) factory.venues = [];
			console.log('venueData[]', venueData[i-1]);
			factory.venues.unshift(venueData[i-1]);
		}
		for (var i = eventData.length; i > 0; i--){
			factory.events.unshift(eventData[i-1]);
		}
		$rootScope.$broadcast('SetVotes');
		console.log("SET MODIFIED", { events: factory.events, venues: factory.venues });
	};
	factory.isNew = false;
	return factory;
});
