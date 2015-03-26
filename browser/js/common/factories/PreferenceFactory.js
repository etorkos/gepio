'use strict';
app.factory('PreferenceFactory', function ($http, AuthService){
	var factory = {};
	factory.getUserPreferences = function (id){
		return $http.get('api/user/:id/preferences').then(function (data){
			return data;
		});
	}
	factory.savePreference = function (id, preferences){
		return AuthService.getLoggedInUser().then(function (user){
			if (user && user._id === id) {
				var path_to_save = '/api/user/' + id + '/preferences';
				return $http.post(path_to_save, preferences).then(function (res){
					return res.data;
				}); 
			}
			else return new Error("Not Authorized");
        });
	}
	factory.updatePreferences = function (id, preferences){
		return AuthService.getLoggedInUser().then(function (user){
			if (user && user._id === id){
				return $http.put('/api/user/' + id + '/preferences', preferences).then(function (res){
					return res.data;
				});
			}
			else return new Error("Not Authorized");
		});
	}
	return factory;
});