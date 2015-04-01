'use strict';
app.directive('navbarItineraries', function($window){
	return {
		restrict : "E",
		templateUrl : "js/common/directives/itineraries/itineraries.html",
		link : function(scope,element,attribute){
			scope.toItinerary = function(dir){
				$window.location.href="/plan/"+dir.type+'/'+dir._id;
			};
		},
		controller: function ($scope, AuthService, UserFactory){
			$scope.invites = [];
			$scope.itineraries = [];

			AuthService.getLoggedInUser().then(function(user){
				console.log('sending the request');
				$scope.user = user;
				$scope.getUserItineraries(user);
			})

			$scope.getUserItineraries = function (user){
				UserFactory.getItineraries(user._id).then(function(data){
					$scope.invites = data.invites;
					$scope.itineraries = data.itineraries;
					console.log('data', data);
				})
			}

			$scope.acceptInvite = function (invite){
				UserFactory.acceptInvite($scope.user, invite._id ).then(function (response){
						console.log(response);
						$scope.getUserItineraries($scope.user);
				})
			}

			$scope.rejectInvite = function (invite){
				UserFactory.removeInvite($scope.user, invite._id ).then(function (response){
						console.log(response);
						$scope.getUserItineraries($scope.user);
				})
			}
		}
	};
});