'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('preferences', {
		url: '/preferences/:user',
		controller: 'PrefCtrl',
		templateUrl: 'js/preferences/preferences.html'
	});
});

app.controller('PrefCtrl', function (AUTH_EVENTS, $rootScope, $scope, $state, $stateParams, PrefBuilder, $http, prefFactory){
	$scope.preferences = PrefBuilder.preferenceInputs;
	$scope.test = "Test";
	$scope.foods = PrefBuilder.foods;
	$scope.events = PrefBuilder.events;
	$scope.nights = PrefBuilder.nights;

	$scope.submitPreference = function(){
		prefFactory.savePreference($scope.user,$scope.preferences);
		$rootScope.$broadcast(AUTH_EVENTS.userUpdated);
		$state.go('user');
	};
});











