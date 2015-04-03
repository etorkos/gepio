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
				// console.log('sending the request');
				$scope.user = user;
				$scope.getUserItineraries(user);
			})

			$scope.getUserItineraries = function (user){
				UserFactory.getItineraries(user._id).then(function(data){
					$scope.invites = data.invites;
					var openItins = [];
					data.itineraries.forEach(function (element){
						if(element.finishStatus != 'closed')
							openItins.push(element);
					});
					$scope.itineraries = openItins;
					// console.log('data', data);
				})
			}

			socket.on('invitation',function(){
				//there is another receiver at maincontroller
				$scope.getUserItineraries($scope.user);
			});

			$scope.acceptInvite = function (invite){
				UserFactory.acceptInvite($scope.user, invite._id ).then(function (response){
						// console.log(response);
						$scope.getUserItineraries($scope.user);
				})
			}

			$scope.rejectInvite = function (invite){
				UserFactory.removeInvite($scope.user, invite._id ).then(function (response){
						// console.log(response);
						$scope.getUserItineraries($scope.user);
				})
			}
		}
	};
});