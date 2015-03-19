'use strict';
var foursquareId = "0RJHOSIA5K2RGK3J3SPOYNMET0HFOLDI0SGMIGQ1YVO0JSMJ";
var foursquareClientSecret= "1POC3EVMA3WZ3S01X0AINBTTVY0VHALFN0IVD0PYHCG1AW1M";
var date = 20150317;

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
