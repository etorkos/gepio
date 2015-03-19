'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        controller: 'UserCtrl',
        templateUrl: 'js/user/user.html'
    });
});

app.controller('UserCtrl', function ($scope, VenuesFactory, $state, AuthService, $window) {
	$scope.logout = function(){
		AuthService.logout();
		$state.go('user');
		$window.location.reload();
	}
	if($scope.user) $scope.pictureURL = $scope.raw.response.user.photo.prefix+"200x200" + $scope.raw.response.user.photo.suffix;
	console.log($scope.pictureURL);
});