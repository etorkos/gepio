'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('plan-itinerary', {
		url: '/plan-itinerary',
		controller: 'PlanCtrl',
		templateUrl: 'js/plan-itinerary/plan-itinerary.html'
	});
});

app.controller('PlanCtrl', function($scope, $filter, VotingFactory){

	console.log($scope.dataSet);
	// VotingFactory.setUpVotes($scope.dataSet.venues);
	// VotingFactory.setUpVotes($scope.dataSet.events);

	$scope.removeVenue = function(place){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var removed = removeFromList($scope.dataSet.venues, place);
		console.log(removed[0].name, ' was removed from the array' );
	}

	$scope.removeEvent = function(item){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var removed = removeFromList($scope.dataSet.events, item);
		console.log(removed[0].name, ' was removed from the array' );
	}

	$scope.upvoteEvent = function (event){
		//for testing atm only
		console.log($filter('checkDate')(event.startTime), $filter('todate')($scope.dt));
	}
});