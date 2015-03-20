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

app.controller('NavbarCtrl', function($scope, $state, AuthService, $window){


	$scope.loggedIn = false; //will need to make a function dependent on session
    $scope.loginClicked = false;

    AuthService.getLoggedInUser().then(function(user){
        if(user){
            $scope.loggedIn = true;
        }
        else {
            $scope.loggedIn = false;
        }
    })
    $scope.logOut = function(){
        AuthService.logout();
        $window.location.reload();
    }

    $scope.toggleVisible = function(){
        $scope.loginClicked = !$scope.loginClicked;
    }

    $scope.redirect = function(location){
        console.log(location, typeof location);
        if(location === 'home') $state.go('home');
        if(location === 'user') $state.go('user');
    }

})