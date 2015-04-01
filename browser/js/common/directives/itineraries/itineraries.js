'use strict';
app.directive('navbarItineraries', function ($window, $state, POIFactory){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/itineraries/itineraries.html",
		link : function (scope, element, attribute){
			scope.toItinerary = function(dir){
				if (dir.title === 'Whats for lunch?' || dir.title === 'Lets go out tonight') dir.type = 'config1';
				else dir.type = 'config2';
				if (POIFactory.allPOIsReturned) $state.go('room.sub', { type: dir.type, id: dir._id });
				else $state.go('loading', { type: dir.type, id: dir._id });
				// $window.location.href = '/plan/' + dir.type + '/' + dir._id;
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
					console.log('data', data);
				})
			})
		}
	};
});