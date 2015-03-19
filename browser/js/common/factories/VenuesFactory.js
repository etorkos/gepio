'use strict';
app.factory('VenuesFactory', function($http){

	return {
		getLocationsFoursquare: function(realCoords){
			// console.log('sending a request to Foursquare');
			var data = {coordinates: realCoords};

			return $http.get('/api/restaurants/foursquare/locations', {params: data}).then(function(response){
				console.log('response from server', response.data);
				return response.data;
			});
		}
	};
});
