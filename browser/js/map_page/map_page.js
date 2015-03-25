'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('map', {
		url: '/map/:id',
		controller: 'MapCtrl',
		templateUrl: 'js/map_page/map_page.html'
	});
});

app.controller('MapCtrl', function ($scope, $state, $stateParams, uiGmapGoogleMapApi, MessageFactory, VotingFactory, passService){
	uiGmapGoogleMapApi.then(function (maps){
		$scope.map = { 
			center: { latitude: 40.705786, longitude: -74.007672 }, 
			zoom: 13
		};
	});
	$scope.active = MessageFactory.active;
	$scope.messages = MessageFactory.messages;
	$scope.makeActive = function (){
		MessageFactory.changeActive();
		$scope.active = !$scope.active;
	};

	$scope.finalizeItinerary = function(){

		var mData = $scope.dataSet;

		$scope.finalData = {
			venues: [],
			events: []
		};
		for(var v = 0; v < mData.venues.length; v++){
			if(mData.venues[v].hasOwnProperty('ranking') && mData.venues[v].ranking > 0)
				$scope.finalData.venues.push(mData.venues[v]);
		}
		for(var e = 0; e < mData.events.length; e++){
			if(mData.events[e].hasOwnProperty('ranking') && mData.events[e].ranking > 0)
				$scope.finalData.events.push(mData.events[e]);	
		};
		// console.log($scope.finalData);
		passService.addFinal($scope.finalData);
		$state.go('final-itinerary');
	}

	setTimeout(function(){
		VotingFactory.setUpVotes($scope.dataSet.venues);
		VotingFactory.setUpVotes($scope.dataSet.events);
	},5000);
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

