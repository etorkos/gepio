'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/navbar/navbar.html',
        controller: 'NavbarCtrl'
    };
});

app.controller('NavbarCtrl', function($scope){


	$scope.loggedIn = false; //will need to make a function dependent on session


	$scope.toggleVisible = function(){
		$state.go('navbar.login');
	}
})