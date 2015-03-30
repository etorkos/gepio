'use strict';


app.controller('DateCtrl', function($scope, $filter, ItemMixFactory, AuthService, POIFactory, $stateParams, roomType, savedEvents){

	POIFactory.hasEvents = true;
	console.log(roomType);
	$scope.config1 = ( roomType === 'config1' );
	console.log("Data Set", $scope.dataSet);

	if(!$scope.dataSet){
		$scope.dataSet.events = savedEvents.otherEvents;
		$scope.dataSet.venues = savedEvents.otherVenues;
	}
	else{
		// angular.copy( ItemMixFactory.removeDuplicates( savedEvents.otherEvents.concat($scope.dataSet.events)), $scope.dataSet.events);
	 //    angular.copy( ItemMixFactory.removeDuplicates( savedEvents.otherVenues.concat($scope.dataSet.venues)), $scope.dataSet.venues);
   		angular.copy( savedEvents.otherEvents.concat($scope.dataSet.events), $scope.dataSet.events);
	    angular.copy( savedEvents.otherVenues.concat($scope.dataSet.venues), $scope.dataSet.venues);
   

    }               

	$scope.removeVenue = function(place){
		//cycle through all items in the dataset for the specific item
		//splice array
		//if we have less than 5 items, request a new call
		var removed = removeFromList($scope.dataSet.venues, place);
		console.log(removed[0].name, ' was removed from the array' );
	}

	// $scope.removeEvent = function(item){
	// 	//cycle through all items in the dataset for the specific item
	// 	//splice array
	// 	//if we have less than 5 items, request a new call
	// 	var removed = removeFromList($scope.dataSet.events, item);
	// 	console.log(removed[0].name, ' was removed from the array' );
	// }

	// $scope.upvoteEvent = function (event){
	// 	//for testing atm only
	// 	console.log($filter('checkDate')(event.startTime), $filter('todate')($scope.dt));
	// }

	$scope.shuffle = function(type){
		if (type == 'venues'){
			ItemMixFactory.shuffle($scope.dataSet.venues, type, $stateParams.id);
		} 
		else if (type == 'events') {
			ItemMixFactory.shuffle($scope.dataSet.events, type, $stateParams.id);
		} 
		else console.log("No match");
		//console.log('length of array', arr.length);
	}

	$scope.blend = function( arr , type ){
		console.log('arr length:', arr.length, arr);
		AuthService.getLoggedInUser().then(function(user){
			if (user){
				console.log('user preferences', type, user.preferences[type]);
				angular.copy(ItemMixFactory.blend( user.preferences[type], arr), arr);

			}
			else{
				var cat = [{ id: '4bf58dd8d48988d10c941735'},{ id: '52e81612bcbc57f1066b79f1'},{ id: '4bf58dd8d48988d110941735'},{ id: '4bf58dd8d48988d1c2941735'}]
				angular.copy(ItemMixFactory.blend( cat, arr), arr);
				console.log(arr.length);
			}

		})
		
	}
});

