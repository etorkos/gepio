'use strict';
app.factory('UserFactory', function($http){
	return {
		updateUser: function(user){
			$http.put('/api/user', user).then(function (response){
				return response.data;
			});
		}
	};
});