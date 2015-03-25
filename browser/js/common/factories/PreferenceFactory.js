'use strict';
app.factory('PreferenceFactory', function ($http){
	var factory = {};
	factory.getUserPreferences = function (id){
		return $http.get('api/user/:id/preferences').then(function (data){
			return data;
		});
	}
	return factory;
});