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
		console.log("ITEM", item);
		return $q(function (resolve, reject){
			if (item.type == 'venue'){
				var max = 0;
				for (var i = 0; i < 8; i++){
					if (factory.venues[i].name == item.name){
						factory.venues[i].votes = item.votes;
					}
					if (factory.venues[i].votes > max) max = factory.venues[i].votes;
				}
				var sorted = [];
				console.log("MAX", max);
				while (max >= 0){
					for (var i = 0; i < 8; i++){
						if (factory.venues[i].votes == max) {
							sorted.push(factory.venues[i]);
							console.log("PUSHED", factory.venues[i]);
						}
					}
					max--;
				}
				console.log("SORTED", sorted);
				for (var i = 0; i < 8; i++){
					factory.venues[i] = sorted[i];
				}
			}
			console.log("DATA REORDERED", factory.venues);
			resolve();
		});
	};
	factory.insertAndUpdate = function (venues, events){
		factory.venues = factory.genericVenues;
		factory.events = factory.genericEvents;
		var venueData = [];
		venues.forEach(function (venue){
			var data = {};
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
		$rootScope.$broadcast('SetVotes');
		console.log("SET MODIFIED", { events: factory.events, venues: factory.venues });
	};
	factory.isNew = false;
	return factory;
});
