'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

app.controller('MainController', function ($scope,$rootScope,AuthService, AUTH_EVENTS) {
    //save login user info, don't delete, important
    function saveUserToScope(){
        AuthService.getLoggedInUser().then(function(user){
            $scope.user = user;
            $scope.isAuthenticated = AuthService.isAuthenticated();
            if($scope.user) $scope.raw = JSON.parse($scope.user.foursquareraw);
        });
    }
    saveUserToScope();

    $rootScope.$on(AUTH_EVENTS.loginSuccess,function(){
        saveUserToScope();
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess,function(){
        delete $scope.user;
        $scope.isAuthenticated = false;
    });
});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});