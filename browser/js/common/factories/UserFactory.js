'use strict';
app.factory('UserFactory', function ($http, MoviesFactory, EventsFactory, VenuesFactory, $q){
	return {
		updateUser: function(user){
			return $http.put('/api/user/' + user._id, user).then(function (response){
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
		findUserByName: function (nameObject){
			return $http.get('/api/user/find/'+nameObject.firstName+'/'+nameObject.lastName).then(function ( response ){
				return response.data;
			})
		},
		findUserByEmail: function (nameObject){
			// console.log('email search', nameObject.email);
			return $http.get('/api/user/find/'+nameObject.email).then(function ( response ){
				return response.data;
			})
		},
		getItineraries: function (userId){
			var path = '/api/user/' + userId + '/itineraries';
			// console.log(path);
			return $http.get(path).then(function(response){
				return response.data;
			});
		},
		removeInvite: function (userId, inviteId){
			return $http.post('/api/user/removeInvite', {userId: userId, inviteId: inviteId}).then(function ( response){
				return response; //should be a boolean
			});
		},
		acceptInvite: function (userId, inviteId){
			return $http.post('/api/user/acceptInvite', {userId: userId, inviteId: inviteId}).then(function ( response){
				return response; //should be a boolean
			});
		},
		generateInitialGenericPOIs: function(){
			return EventsFactory.getEvents('103').then(function (events){
				var data = { movies: null, events: [], venues: [], totals: 0 };
				data.events = data.events.concat(events);
				data.totals += events.length;
				return data;
			}).then(function (data){
				return VenuesFactory.getVenues('4bf58dd8d48988d10c941735').then(function (venues){
					data.venues = data.venues.concat(venues);
					data.totals += venues.length;
					return data;
				});
			}).then(function (data){
				return VenuesFactory.getVenues('4bf58dd8d48988d1e9931735').then(function (venues){
					data.venues = data.venues.concat(venues);
					data.totals += venues.length;
					return data;
				});
			});
		},
		generateMorePOIs: function (events, venues, nights){
			var eventCategories = events;
			var venueCategories = venues.concat(nights);
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
					data.venues = data.venues.concat(venues);
					data.totals += venues.length;
					return data;
				});
			});
		},
		generateInitialCustomPOIs: function (event, food, night){
			return EventsFactory.getEvents(event).then(function (e){
				var data = { events: [], venues: [], totals: 0 };
				data.events = data.events.concat(e);
				data.totals += e.length;
				return data;
			}).then(function (data){
				return VenuesFactory.getVenues(food).then(function (v){
					data.venues = data.venues.concat(v);
					data.totals += v.length;
					return data;
				});
			}).then(function (data){
				return VenuesFactory.getVenues(night).then(function (n){
					data.venues = data.venues.concat(n);
					data.totals += n.length;
					return data;
				});
			});
		},
		parseUserPreferences: function (user){
			var preferences = { events: [], foods: [], nights: [], hasMovies: false };
			user.preferences.events.forEach(function (event){
                if (JSON.parse(event).id === 'movie') preferences.hasMovies = true;
                else preferences.events.push(JSON.parse(event).id);
            });
            user.preferences.nights.forEach(function (night){
                preferences.nights.push(JSON.parse(night).id);
            });
            user.preferences.foods.forEach(function (food){
                preferences.foods.push(JSON.parse(food).id);
            });
            return preferences;
		}


	};
});