'use strict';
var foursquareId = "0RJHOSIA5K2RGK3J3SPOYNMET0HFOLDI0SGMIGQ1YVO0JSMJ";
var foursquareClientSecret= "1POC3EVMA3WZ3S01X0AINBTTVY0VHALFN0IVD0PYHCG1AW1M";
var date = 20150317;

app.factory('VenuesFactory', function($http){

	return {
		getLocationsForesquare: function(searchTerm, location){
			console.log('sending a request to Foursquare');
			return $http.get('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&query='+searchTerm+'&limit=5&client_id='+foursquareId+'client_secret='+foursquareClientSecret+'&v='+date).then(function(response){
				console.log('response from server', response.data);
				return response.data;
			})
		},
		getLocationsYelp: function(data){
			return $http.post('/api/yelp/search').then(function (res){
				console.log("Yelp Data", res.data);
				return res.data;
			});
		},
		getLocationsOpenTable: function(data){
			return $http.post('/api/opentable/search', {city: data}).then(function(res){
				console.log("OpenTable", res.data, typeof res.data);
				return res.data;
			});
		}

	}

})

