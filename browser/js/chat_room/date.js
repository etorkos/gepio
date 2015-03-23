'use strict';

function removeFromList (scopeDset, item){
	var loc = -1;
	for(var a = 0, len = scopeDset.length; a< len; a++){
			if(scopeDset[a].name === item.name){
				console.log('match at location',a)
				loc = a;
				break;
			}
		}
	return scopeDset.splice(loc, 1);
}

app.controller('DateCtrl', function($scope, $filter){

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
		console.log($filter('checkDate')(event.startTime), $filter('todate')($scope.dt));
	}
});

app.filter('checkDate', function($filter)
{
    return function(input, scope)
    {
        if(input == null){ return ""; }
        var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
        var _userDate = $filter('date')(new Date(scope.dt), 'dd/MM/yyyy');
        return _date === _userDate;
        
    };
});