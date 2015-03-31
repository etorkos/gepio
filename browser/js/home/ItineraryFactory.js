'use strict';
app.factory('ItineraryFactory', function ($http){
	var factory = {};
	factory.createItinerary = function (data){
		return $http.post('/api/itinerary', data).then(function(response){
			if(response.status === 500){
				console.log('Database error', response.data);
			}
			else{
				console.log('got back to ItineraryFactory');
				return response.data;
			}
		});
	};
	factory.getItinerary = function (itineraryId){
		console.log('in itinerary factory');
		return $http.get('/api/itinerary/' + itineraryId)
		.then(function(response){
			console.log('response from getItinerary server ', response.data);
			return response.data;
		});
	};
	factory.createDataSet = function (type, data){
		var venues = [];
		var events = [];
		for (var i = 0; i < 8; i++){
			venues.push(data.venues[i]);
		}
		if (type == 'config1'){
			return { venues: venues };
		}
		else {
			var today = new Date();
			var tm = (Number(today.getMonth()) + 1);
			var td = today.getDate();
			var ty = today.getFullYear();
			for (var i = 0; i < data.events.length; i++){
				var eventDate = new Date(data.events[i].startTime);
				if (eventDate.getFullYear() === ty && (Number(eventDate.getMonth()) + 1) === tm && eventDate.getDate() === td){
					events.push(data.events[i]);
				}
				if (events.length >= 8) break;
			}
			return { venues: venues, events: events };
		}
	};
	factory.updateEventsSet = function (data){
		if (factory.setActiveParams.type === 'config2'){
			var events = [];
			var today = new Date();
			var tm = (Number(today.getMonth()) + 1);
			var td = today.getDate();
			var ty = today.getFullYear();
			for (var i = 0; i < data.length; i++){
				for (var x = 0; x < data[i].length; x++){
					var eventDate = new Date(data[i][x].startTime);
					if (eventDate.getFullYear() === ty && (Number(eventDate.getMonth()) + 1) === tm && eventDate.getDate() === td){
						events.push(data[i][x]);
					}
				}
				if (events.length >= 8) break;
			}
			var update = { id: factory.setActiveParams.id, data: events };
			$http.put('/api/itinerary/add', update).then(function (res){
				console.log("Events Updated", res.data);
			});
		};
	};
	factory.inviteUser = function (itineraryId, userId){
		var body = { itineraryId: itineraryId, userId: userId };
		return $http.post('/api/itinerary/invite').then(function (res){
			return res.data;
		});
	};
	factory.toggleInviteStatus = function (itineraryId){
		var body = { id: itineraryId};
		return $http.post('/api/itinerary/togglesetting', body).then(function (res){
			return res.data;
		});
	};
	factory.changeEventsDate = function (date, data){
		if (factory.setActiveParams.type === 'config2'){
			var events = [];
			var day = new Date(date);
			var tm = (Number(day.getMonth()) + 1);
			var td = day.getDate();
			var ty = day.getFullYear();
			for (var i = 0; i < data.length; i++){
				var eventDate = new Date(data[i].startTime);
				if (eventDate.getFullYear() === ty && (Number(eventDate.getMonth()) + 1) === tm && eventDate.getDate() === td){
					events.push(data[i]);
				}
				if (events.length >= 8) break;
			}
			var update = { id: factory.setActiveParams.id, data: events };
			$http.put('/api/itinerary/day', update).then(function (res){
				console.log("Events Updated", res.data);
			});
		}
	}
	factory.setActiveParams = undefined;
	// updateDataSet: function (type, id, set){
	// 	var data = { type: type, id: id, data: set };
	// 	return $http.put('/api/itinerary/update', data).then(function (res){
	// 		console.log(res)
	// 		return res.data;
	// 	});
	// },
	return factory;
});