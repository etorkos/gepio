'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('map', {
		url: '/map/:id',
		controller: 'MapCtrl',
		templateUrl: 'js/map_page/map_page.html'
	});
});

app.controller('MapCtrl', function ($scope, $state, $stateParams, uiGmapGoogleMapApi, MessageFactory){
	uiGmapGoogleMapApi.then(function (maps){
		$scope.map = { 
			center: { latitude: 40.705786, longitude: -74.007672 }, 
			zoom: 13
		};
	});
	$scope.active = false;
	$scope.messages = MessageFactory.messages;
	$scope.makeActive = function (){
		$scope.active = !$scope.active;
	}
});

