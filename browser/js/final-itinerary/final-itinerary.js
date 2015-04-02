'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('final-itinerary', {
		url: '/final-itinerary/:type/:id',
		controller: 'IntineraryCtrl',
		templateUrl: 'js/final-itinerary/final-itinerary.html'
	});
});

app.controller('IntineraryCtrl', function ($scope, $state, $stateParams, passService, POIFactory, ItineraryFactory){

	// $scope.finalData = passService.getFinal();

	var interpretIntinerary = function(){
		ItineraryFactory.getItinerary($stateParams.id).then(function(returnedData){
			$scope.itinTitle = returnedData.title;
		});
		if($stateParams.type == 'config1')
			$scope.showEvents = false;
		else
			$scope.showEvents = true;
		//sets the values for final itinerary
	};


	$scope.saveIt = function(){

	}

	$scope.goBack = function(){
		$state.go('map', { id: $stateParams.id, type: $stateParams.type });
	}

	interpretIntinerary();
});

