app.controller('NightlifeCtrl', function($scope, $filter){

	$scope.removeVenue = function(place){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var removed = removeFromList($scope.dataSet.venues, place);
		console.log(removed[0].name, ' was removed from the array' );
	}

	$scope.upvoteEvent = function (event){
		//for testing atm only
		console.log($filter('checkDate')(event.startTime), $filter('todate')($scope.dt));
	}

});