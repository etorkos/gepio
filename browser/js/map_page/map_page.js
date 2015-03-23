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
			center: $scope.geoSet, 
			zoom: 13
		};
	});
	$scope.active = MessageFactory.active;
	$scope.messages = MessageFactory.messages;
	$scope.makeActive = function (){
		MessageFactory.changeActive();
		$scope.active = !$scope.active;
	};
});

