'use strict';

app.factory('VenuesFactory', function ($http, GeolocationFactory){

	return {
		getVenues: function(category){
			var data = {latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude, categories: category, query: query};

			return $http.get('/api/venues/search', {params: data}).then(function(response){
				var venues = [];
				response.data.response.venues.forEach(function (venue){
					var holder = {};
					holder.category = venue.categories[0];
					holder.contact = venue.contact.formattedPhone;
					holder.name = venue.name;
					holder.location = venue.location;
					venues.push(holder);
				});
				return venues;
			});
		}
	};
});
