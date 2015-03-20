'use strict';
app.factory('UserFactory', function($http){
	return {
		updateUser: function(user){
			$http.put('/user/'+ user._id).then(function(response){
				return response.data;
			});
		}
	};
});