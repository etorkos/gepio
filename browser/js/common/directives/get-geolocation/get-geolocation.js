'use strict';
app.directive('getGeolocation', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/get-geolocation/get-geolocation.html',
		controller: function($scope, VenuesFactory, EventsFactory, GeolocationFactory, MoviesFactory){

			$scope.doFour = function(){
				VenuesFactory.getVenues('4bf58dd8d48988d1cb941735').then(function (data){
					$scope.data = data;
				});
			};

			$scope.doEvent = function(){
				EventsFactory.getEvents().then(function (data){
					$scope.data = data;
				});
			};
		}
	};
});