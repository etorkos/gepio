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

	var interpretIntinerary = function(){

	}

	if($stateParams.type == 'config1')
		$scope.showEvents = false;
	else
		$scope.showEvents = true;

	$scope.saveIt = function(finalItinerary){

	}

	interpretIntinerary();
});

