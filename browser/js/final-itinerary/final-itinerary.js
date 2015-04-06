'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('final-itinerary', {
		url: '/final-itinerary/:type/:id',
		controller: 'FIntineraryCtrl',
		templateUrl: 'js/final-itinerary/final-itinerary.html'
	});
});

app.controller('FIntineraryCtrl', function ($scope, $state, $stateParams, POIFactory, ItineraryFactory, UserFactory){

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
			$scope.id = returnedData._id;
			$scope.finalVenue = filterFinal(returnedData.otherVenues);
			$scope.finalEvent = filterFinal(returnedData.otherEvents);

			//whether to show buttons or not
			if($scope.finalIt.finishStatus == 'closed')
				$scope.isClosed = true;
			else
				$scope.isClosed = false;
		});
		
	};

	var captialization = function(name){
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	var formatUsers = function(){//function(users){
		//Will need to get all users from itinerary, populate based on name and then display all with users.forEach()

		$scope.finalOctos = captialization($scope.user.firstName) + " " + captialization($scope.user.lastName);
	};

	$scope.goBack = function(){
		$state.go('map', { id: $stateParams.id, type: $stateParams.type });
	};

	$scope.finishItn = function(){
		//Will need an emitter to close event for others
		var fconfirmation = confirm("Are you sure you want to finish this itinerary?");
		if (fconfirmation === true){
			$scope.finalIt.otherVenues = [$scope.finalVenue];
			$scope.finalIt.otherEvents = [$scope.finalEvent];
			$scope.finalIt.finishStatus = 'closed';
			$scope.finalIt.evType = $stateParams.type;
			ItineraryFactory.finishItinerary($scope.finalIt);
			interpretIntinerary();
		};
	};

	$scope.deleteItn = function(){
		//Will likely need emitter to close event on other people's windows
		var dconfirmation = confirm("Are you sure you want to delete this itinerary?");
		if (dconfirmation === true){
			ItineraryFactory.deleteItinerary($scope.id);
			$state.go('home')
		};
	};

	formatUsers();
	interpretIntinerary();
});
