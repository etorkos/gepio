'use strict';

app.controller('DateCtrl', function($scope){

	$scope.removeVenue = function(place){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var loc = -1;
		console.log($scope.dataSet.venues, 'venues');
		console.log(place, " this item's deletion was requested")
		for(var a = 0, len = $scope.dataSet.venues.length; a< len; a++){
			console.log($scope.dataSet.venues.name, place.name);
			if($scope.dataSet.venues.name === place.name){
				loc = a;
				return;
			}
		}
		var removed = $scope.dataSet.venues.splice(loc, 1);
		console.log(removed.name, ' was removed from the array' );
	}


    });