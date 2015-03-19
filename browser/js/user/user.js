'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/user.html'
    });
});

app.controller('UserCtrl', function ($http, $scope, VenuesFactory, $state, AuthService, $window) {
	$scope.logout = function(){
		AuthService.logout();
		$window.location.reload();
	}
	if($scope.user){
		$scope.pictureURL = $scope.raw.response.user.photo.prefix+"200x200" + $scope.raw.response.user.photo.suffix;
		var path_to_preferences = "/api/user/"+ $scope.user._id+'/preferences';
		$http.get(path_to_preferences).then(function(response){
			$scope.user.preferences = response.data
		});	
	};
});