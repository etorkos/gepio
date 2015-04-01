'use strict';
app.factory('DataSetFactory', function (){
	var factory = {};
	factory.events = undefined;
	factory.venues = undefined;
	factory.movies = undefined;
	factory.insertAndUpdate = function (venues, events){
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
	};
	factory.isNew = false;
	return factory;
});