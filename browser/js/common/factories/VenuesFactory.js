'use strict';

app.factory('VenuesFactory', function($http){

	return {
		getLocationsFoursquare: function(coordLat, coordLong){
			// console.log('sending a request to Foursquare');
			var data = {latitude: coordLat, longitude: coordLong};

			return $http.get('/api/restaurants/foursquare/locations', {params: data}).then(function(response){
				console.log('response from server', response.data);
				return response.data;
			});
		},
		getLocationsEventbrite: function(coordLat, coordLong){
			var data = {latitude: coordLat, longitude: coordLong};

			return $http.get('/api/restaurants/eventbrite/events', {params: data}).then(function (response){
				console.log('response from server', response.data);
				return response.data;
			});
		}
	};
});
