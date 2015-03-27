'use strict';
app.factory('UserFactory', function ($http, MoviesFactory, EventsFactory, VenuesFactory, $q){
	return {
		updateUser: function(user){
			$http.put('/api/user', user).then(function (response){
				return response.data;
			});
		},
		checkUser: function (user){
			if (!user) return false;
			else {
				var hasPreferences = false;
				if (user.preferences.nights.length > 1) hasPreferences = true;
				if (user.preferences.events.length > 1) hasPreferences = true;
				if (user.preferences.foods.length > 1) hasPreferences = true;
				return hasPreferences;
			}
		},
		generateInitialGenericPOIs: function(){
			return MoviesFactory.getMovies().then(function (movies){
				var data = { movies: null, events: [], venues: [], totals: 0 };
				data.movies = movies;
				data.totals += movies.length;
				return data;
			}).then(function (data){
				return EventsFactory.getEvents('103').then(function (events){
					data.events = data.events.concat(events);
					data.totals += events.length;
					return data;
				}).then(function (data){
					return VenuesFactory.getVenues('4bf58dd8d48988d10c941735').then(function (venues){
						data.venues = data.venues.concat(venues);
						data.totals += venues.length;
						return data;
					});
				});
			});
		},
		generateMorePOIs: function (events, venues){
			var eventCategories = events;
			var venueCategories = venues;
			var data = { events: [], venues: [], totals: 0 };
			var events = eventCategories.map(function (cat){
				return EventsFactory.getEvents(cat);
			});
			return $q.all(events).then(function (events){
				data.events = data.events.concat(events);
				data.totals += events.length;
				var venues = venueCategories.map(function (cat){
					return VenuesFactory.getVenues(cat);
				});
				return $q.all(venues).then(function (venues){
					data.venues = data.events.concat(venues);
					data.totals += venues.length;
					return data;
				});
			});
		},
		generateInitialCustomPOIs: function (event, venue){
			return EventsFactory.getEvents(event).then(function (e){
				var data = { events: [], venues: [], totals: 0 };
				data.events = data.events.concat(e);
				data.totals += e.length;
				return data;
			}).then(function (data){
				return VenuesFactory.getVenues(venue).then(function (v){
					data.venues = data.venues.concat(v);
					data.totals += v.length;
					return data;
				});
			});
		},
		parseUserPreferences: function (user){
			var preferences = { events: [], foods: [], hasMovies: false };
			user.preferences.events.forEach(function (event){
                if (JSON.parse(event).id === 'movie') preferences.hasMovies = true;
                else preferences.events.push(JSON.parse(event).id);
            });
            user.preferences.nights.forEach(function (night){
                preferences.foods.push(JSON.parse(night).id);
            });
            user.preferences.foods.forEach(function (food){
                preferences.foods.push(JSON.parse(food).id);
            });
            return preferences;
		}
	};
});