'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('preferences', {
		url: '/preferences/:user',
		controller: 'PrefCtrl',
		templateUrl: 'js/preferences/preferences.html'
	});
});

app.controller('PrefCtrl', function (AUTH_EVENTS, $rootScope, $scope, $state, $stateParams, PrefBuilder, $http, PreferenceFactory){
	$scope.preferences = PrefBuilder.preferenceInputs;
	$scope.test = "Test";
	$scope.foods = PrefBuilder.foods;
	$scope.events = PrefBuilder.events;
	$scope.nights = PrefBuilder.nights;

	PrefBuilder.preferenceInputs.nights = $scope.user.preferences.nights;
	PrefBuilder.preferenceInputs.foods = $scope.user.preferences.foods;
	PrefBuilder.preferenceInputs.events = $scope.user.preferences.events;

	$scope.submitPreference = function(){
		PreferenceFactory.savePreference($scope.user._id, $scope.preferences).then(function (data){
			console.log(data);
			$rootScope.$broadcast(AUTH_EVENTS.userUpdated);
			$rootScope.$broadcast("PreferencesAdded");
			$state.go('home');
		});
	};
});











