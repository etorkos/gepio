'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('final-itinerary', {
		url: '/final-itinerary/:type/:id',
		controller: 'FIntineraryCtrl',
		templateUrl: 'js/final-itinerary/final-itinerary.html'
	});
});

app.controller('FIntineraryCtrl', function ($scope, $state, $stateParams, POIFactory, ItineraryFactory){

	if($stateParams.type == 'config1')
		$scope.showEvents = false;
	else
		$scope.showEvents = true;

	var filterFinal = function(placeArr){
		//Takes highest voted place/venue and then returns it
		//Or else it will take the first value of the array
		var highestVoted = placeArr[0];
		placeArr.forEach(function(el){
			if (highestVoted.votes < el.votes)
				highestVoted = el;
		});
		return highestVoted;
	};

	var fixDate = function(thisDate){
		var d = new Date(thisDate);
		var monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"];
		var fixedDate = monthNames[d.getMonth()] +" "+d.getDate() +", "+d.getFullYear();
		return fixedDate;
	}

	var interpretIntinerary = function(){
		//Instead of messing with scopes, just get all data from database
		//sets the values for final itinerary display
		ItineraryFactory.getItinerary($stateParams.id).then(function(returnedData){
			$scope.finalIt = returnedData;
			$scope.itinTitle = returnedData.title;
			$scope.itinDate = fixDate(returnedData.date);
			console.log(fixDate(returnedData.date));
			$scope.id = returnedData._id;
			$scope.finalVenue = filterFinal(returnedData.otherVenues);
			$scope.finalEvent = filterFinal(returnedData.otherEvents);
		});
	};

	$scope.goBack = function(){
		$state.go('map', { id: $stateParams.id, type: $stateParams.type });
	};

	$scope.finishItn = function(){
		//Will need an emitter to close event for others
		$scope.finalIt.otherVenues = $scope.finalVenue;
		$scope.finalIt.otherEvents = $scope.finalEvent;
		$scope.finalIt.finishStatus = 'closed';
		ItineraryFactory.finishItinerary($scope.id);
	};

	$scope.deleteItn = function(){
		//Will likely need emitter to close event on other people's windows
		var confirmation = confirm("Are you sure you want to delete this itinerary?");
		if (confirmation === true){
			ItineraryFactory.deleteItinerary($scope.id);
			$state.go('home')
		};
	};

	interpretIntinerary();
});

