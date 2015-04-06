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
		AuthService.getLoggedInUser().then(function (user){
			if(user){
				UserFactory.updateUser(user).then(function (user){
					// console.log(user);
				});
			}
		});
	};

	var getFinUserItineraries = function (user){
		UserFactory.getItineraries(user._id).then(function(data){
			var finishedItins = [];
			data.itineraries.forEach(function (element){
				if(element.finishStatus == 'closed')
					finishedItins.push(element);
			});
			$scope.finItin = finishedItins;
		});
	};

	if($scope.user){
		if ($scope.raw) $scope.pictureURL = $scope.raw.response.user.photo.prefix+"150x150" + $scope.raw.response.user.photo.suffix;
		var path_to_preferences = "/api/user/"+ $scope.user._id+'/preferences';
		$http.get(path_to_preferences).then(function (response){
			$scope.user.preferences = response.data;
		});	
		getFinUserItineraries($scope.user);
	}
});