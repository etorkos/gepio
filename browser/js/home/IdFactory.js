'use strict';
app.factory('IdFactory', function($http){
	return {
		createId: function(data) { // will create a itinerary (pass in a user or no user)
			return $http.post('/api/itinerary', data).then(function(response){
				return response.data;
			})
		}
	}

})