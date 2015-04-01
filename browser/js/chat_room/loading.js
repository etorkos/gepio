'use strict';
app.controller('LoadingCtrl', function ($scope, $state, $stateParams, POIFactory, $timeout, $rootScope){
	$scope.hasReturned = POIFactory.allPOIsReturned;
	$rootScope.$on('allDataReturned', function (event, args){
		$state.go('room.sub', { type: $stateParams.type, id: $stateParams.id });
	});
});