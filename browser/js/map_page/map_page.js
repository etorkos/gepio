'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('map', {
		url: '/map/:type/:id',
		controller: 'MapCtrl',
		templateUrl: 'js/map_page/map_page.html'
	});
});

app.controller('MapCtrl', function ($scope, $state, $stateParams, uiGmapGoogleMapApi, MessageFactory, VotingFactory, passService, GeolocationFactory, POIFactory, $filter){
	uiGmapGoogleMapApi.then(function (maps){
		$scope.map = { 
			center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude },
			zoom: 13
		};
	});

	console.log($stateParams.type);
	$scope.user_location = { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude };
	$scope.active = MessageFactory.active;
	$scope.messages = MessageFactory.messages;
	$scope.makeActive = function (){
		MessageFactory.changeActive();
		$scope.active = !$scope.active;
	};

	$scope.refresh = true;
	$scope.hasEvents = POIFactory.hasEvents;

	$scope.date = POIFactory.date;

	$scope.data = $scope.dataSet;
	console.log($scope.data.venues);

	$scope.goToPlan = function (){
		$state.go('room.sub', { id: $stateParams.id, type: $stateParams.type });
	}

	$scope.finalizeItinerary = function(){

		// var mData = $scope.dataSet;

		// $scope.finalData = {
		// 	venues: [],
		// 	events: []
		// };
		// for(var v = 0; v < mData.venues.length; v++){
		// 	if(mData.venues[v].hasOwnProperty('votes') && mData.venues[v].votes > 0)
		// 		$scope.finalData.venues.push(mData.venues[v]);
		// }
		// for(var e = 0; e < mData.events.length; e++){
		// 	if(mData.events[e].hasOwnProperty('votes') && mData.events[e].votes > 0)
		// 		$scope.finalData.events.push(mData.events[e]);	
		// };
		// // console.log($scope.finalData);
		// passService.addFinal($scope.finalData);
		$state.go('final-itinerary');
	}

	if($stateParams.type == 'config1')
		$scope.showEvents = false;
	else
		$scope.showEvents = true;
		


});

app.service('passService', function(){
	//can remove once database persistence is working with each room
	var finalData;

	var addFinal = function(fData){
		finalData = fData;
	};
	var getFinal = function(){
		return finalData;
	};

	return{
		addFinal: addFinal,
		getFinal: getFinal
	};
});

