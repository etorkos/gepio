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

	var filterFinal = function(placeArr){
		//Takes highest voted place/venue and then returns it
		highestVoted = placeArr[0];
		placeArr.forEach(function(el){
			if(highestVoted.votes < el.votes)
				highestVoted = el;
		});
		return highestVoted;
	}

	var interpretIntinerary = function(){
		ItineraryFactory.getItinerary($stateParams.id).then(function(returnedData){
			$scope.itinTitle = returnedData.title;
			$scope.itinDate = returnedData.date;
			$scope.id = returnedData._id;
			$scope.finalVenue = filterFinal(returnedData.otherVenues);
			$scope.finalEvent = filterFinal(returnedData.otherEvents);
		});
		if($stateParams.type == 'config1')
			$scope.showEvents = false;
		else
			$scope.showEvents = true;
		//sets the values for final itinerary
	};

	$scope.goBack = function(){
		$state.go('map', { id: $stateParams.id, type: $stateParams.type });
	}

	$scope.saveIt = function(){
		returnedData.otherVenues = $scope.finalVenue;
		returnedData.otherEvents = $scope.finalEvent;
		returnedData.finishStatus = 'closed';
	};

	$scope.deleteIt = function(){
		var confirmation = confirm("Are you sure you want to delete this itinerary?");
		if (confirmation === true){
			ItineraryFactory.deleteItinerary($scope.id);
			$state.go('home')
		};
	};

	interpretIntinerary();
});

