'use strict';
app.factory('ItineraryFactory', function($http){
	return {
		createItinerary: function(data) { // will create a itinerary (pass in a user or no user)
			return $http.post('/api/itinerary', data).then(function(response){
				if(response.status === 500){
					console.log('Database error', response.data);
				}
				else{
					console.log('got back to ItineraryFactory');
					return response.data;
				}
			});
		},
		getItinerary: function(itineraryId){
			console.log('in itinerary factory');
			return $http.get('/api/itinerary/' + itineraryId)
			.then(function(response){
				console.log('response from getItinerary server ', response.data);
				return response.data;
			});
		},
		createDataSet: function (type, data){
			var venues = [];
			var events = [];
			for (var i = 0; i < 8; i++){
				venues.push(data.venues[i]);
			}
			if (type == 'Whats for lunch?' || type == 'Lets go out tonight'){
				return { venues: venues };
			}
			else {
				for (var i = 0; i < 8; i++){
					events.push(data.events[i]);
				}
				return { venues: venues, events: events };
			}
		},
		updateDataSet: function (type, id, set){
			var data = { type: type, id: id, data: set };
			return $http.put('/api/itinerary/update', data).then(function (res){
				console.log(res)
				return res.data;
			});
		}
	};
});