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


app.controller('ExploreCtrl', function($scope, $filter,$stateParams, ChatroomFactory, POIFactory){
	ChatroomFactory.set_itinerary_id($stateParams.id); //tears
	POIFactory.hasEvents = true;

});