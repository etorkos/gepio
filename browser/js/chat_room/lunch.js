app.controller('LunchCtrl', function($scope, $filter, POIFactory){

	POIFactory.hasEvents = false;

	$scope.removeVenue = function(place){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var removed = removeFromList($scope.dataSet.venues, place);
		console.log(removed[0].name, ' was removed from the array' );
	}

	$scope.upvoteEvent = function (event,$stateParams,ChatroomFactory){
		//for testing atm only
		console.log($filter('checkDate')(event.startTime), $filter('todate')($scope.dt));
		ChatroomFactory.set_itinerary_id($stateParams.id);
		console.log("hi",$stateParams)
	}

});