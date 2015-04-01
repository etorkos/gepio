'use strict';
app.controller('LoadingCtrl', function ($scope, $state, $stateParams, POIFactory, $timeout){
	$scope.hasReturned = POIFactory.allPOIsReturned;

	$scope.check = function (){
		$timeout(function (){
			$scope.hasReturned = POIFactory.allPOIsReturned;
			if (POIFactory.allPOIsReturned) $state.go('room.sub', { type: $stateParams.type, id: $stateParams.id });
			console.log("Test");
			if (!$scope.hasReturned) $scope.check();
		}, 1000);
	}
	$scope.check();
});