'user strict';
app.directive('invite', function (UserFactory, ItineraryFactory, $stateParams){

	return {
		restrict: "E",
		templateUrl: "js/common/directives/invite/invite.html",
		controller: function ($scope, UserFactory, ItineraryFactory, $rootScope, ChatroomFactory){
			$scope.invite = { };

			$scope.searchByName = function (){
				$scope.invite.firstName = $scope.invite.firstName.toLowerCase();
				$scope.invite.lastName = $scope.invite.lastName.toLowerCase();
				UserFactory.findUserByName($scope.invite).then(function (response){
					 console.log('response', response);
					if( response._id === null){
						console.log('User information was not found in DB');
					}
					else {
						console.log('user info found');
						ItineraryFactory.inviteUser( $rootScope.ItineraryId, response._id ).then(function (postResponse){
							if(postResponse) {
								console.log('invite sent');
								ChatroomFactory.invite_friend(response._id);
							}
							else console.log('invite not sent');
						}); 
					}
				});
			};

			$scope.emailValid = function (string){

				var regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'/g;
				return regex.test(string);
			}

			$scope.searchByEmail = function (){
				UserFactory.findUserByEmail($scope.invite).then(function (response){
					console.log('response', response);
					if( response._id === null){
						console.log('User information is not found in DB');
					}
					else {
						ItineraryFactory.inviteUser( $rootScope.ItineraryId, response._id ).then(function (postResponse){
							if(postResponse) {
								console.log('invite sent');
								ChatroomFactory.invite_friend(response._id);
							}
							else console.log('invite not sent');
						}); 
					}
				});
			}

		}
	}
});