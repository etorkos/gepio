'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/user.html'
    });
});

app.controller('UserCtrl', function ($scope, $state, $http, AuthService, UserFactory, $window, PreferenceFactory) {
	$scope.logout = function(){
		AuthService.logout();
		$window.location.reload();
	};

	$scope.updateUsr = function(){
		UserFactory.updateUser($scope.user).then(function (user){
			console.log(user);
		});
	};

	if($scope.user){
		if ($scope.raw) $scope.pictureURL = $scope.raw.response.user.photo.prefix+"150x150" + $scope.raw.response.user.photo.suffix;
		var path_to_preferences = "/api/user/"+ $scope.user._id+'/preferences';
		$http.get(path_to_preferences).then(function (response){
			$scope.user.preferences = response.data;
		});	
	}
});