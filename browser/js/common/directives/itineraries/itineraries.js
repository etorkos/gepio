'use strict';
app.directive('navbarItineraries', function($window){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/itineraries/itineraries.html",
		link : function(scope,element,attribute){
			scope.toItinerary = function(dir){
				console.log(dir);
				console.log("/plan/"+dir.type+'/'+dir._id)
				// $window.location.href="/plan/"+dir.type+'/'+dir._id;
			};
		},
		controller: function ($scope, AuthService, UserFactory){
			$scope.invites = [];
			$scope.itineraries = [];

			AuthService.getLoggedInUser().then(function(user){
				console.log('sending the request');
				UserFactory.getItineraries(user._id).then(function(data){
					$scope.invites = data.invites;
					$scope.itineraries = data.itineraries;
					console.log($scope.itineraries);
				})
			})
		}
	};
});