'use strict';
app.directive('getGeolocation', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/get-geolocation/get-geolocation.html',
		controller: function($scope, VenuesFactory){

			$scope.getGeo = function(){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function (position){
						$scope.latitude = position.coords.latitude;
						$scope.longitude = position.coords.longitude;
					});
				} else
					console.log("Geolocation is not supported by this browser");
			};

			$scope.doFour = function(){
				VenuesFactory.getLocationsFoursquare($scope.latitude, $scope.longitude).then(function (backedData){
					console.log(backedData.response);
				});
			};

			$scope.doEvent = function(){
				VenuesFactory.getLocationsEventbrite($scope.latitude, $scope.longitude).then(function (backedData){
					console.log(backedData.response);
				});
			};
		}
	};
});