'use strict';
app.factory('VenuesFactory', function($http){

	return {
		getLocationsForesquare: function(data){
			console.log('sending a request to Foursquare');
			return $http.get('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=UMSMDY2RN23B1VRQXPFUGIZHLZLD4FHPM2BJHNOJBGE13AIP&v=20150317').then(function(response){
				console.log('response from server', response.data);
				return response.data;
			})
		}
	}

})