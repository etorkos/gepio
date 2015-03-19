'use strict';
app.directive('getGeolocation', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/get-geolocation/get-geolocation.html',
		controller: function($scope){

			$scope.getGeo = function(){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function (position){
						$scope.coordinates = position.coords.latitude + ", " + position.coords.longitude;
						// console.log($scope.coordinates);
						// $scope.$digest(); //include if want to show coordinates
					});
				} else
					console.log("Geolocation is not supported by this browser");
			};
		}
	};
});