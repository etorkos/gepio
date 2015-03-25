'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('final-itinerary', {
		url: '/final-itinerary',
		controller: 'IntineraryCtrl',
		templateUrl: 'js/final-itinerary/final-itinerary.html'
	});
});

app.controller('IntineraryCtrl', function ($scope, $state, passService){
	// console.log($scope.finalData)
	//
	$scope.finalData = passService.getFinal();
	console.log($scope.finalData);
});

