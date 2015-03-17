'use strict';
app.factory('VenuesFactory', function($http){

	return {
		getLocationsForesquare: function(data){
			console.log('sending a request to Foursquare');
			return $http.get('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=UMSMDY2RN23B1VRQXPFUGIZHLZLD4FHPM2BJHNOJBGE13AIP&v=20150317').then(function(response){
				console.log('response from server', response.data);
				return response.data;
			})
		},
		getLocationsYelp: function(data){
			console.log('sending request to Yelp');
			var consumerKey = "dJs9nnzSGymTp3sNWgOBwg";
			var consumerSecret = "PHKlEhNoQnMVKUqlqkgYrHju-24";
			var token = "K5YvukEBKvpov4KPKKNFkBrSNILaO_8n";
			var tokenSecret = "dzKKvUE3WQjqb4aEIWT3Zza38vk";
			var timestamp = Date.now() / 1000;
			var str = "abc123";
			var url = 'http://api.yelp.com/vs/search?term=food&location=New+York&oauth_comsumer_key=' + consumerKey + '&oauth_token=' + token + '&oauth_signature_method=hmac-sha1&oauth_signature=' + tokenSecret + '&oauth_timestamp=' + timestamp + '&oauth_nonce=' + str;
			return $http.get(url).then(function (res){
				console.log("Yelp Data", res.data);
				return res.data;
			});

		}
	}

})