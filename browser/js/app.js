'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ui.bootstrap', 'uiGmapgoogle-maps']);

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

    $rootScope.$on(AUTH_EVENTS.userUpdated,function(){
        saveUserToScope();
    });
    // Given to the <navbar> directive to show the menu.
    $scope.menuItems = [
        { label: 'Home', state: 'home' },
        { label: 'Register', state:'home.register' },
        { label: 'Login', state:'home.login' }
    ];

    $scope.editProfile = 
        { label: 'Edit Profile', state: 'edit' };
});


app.config(function ($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDDjU2NmOYAlttlLwWOYEvPkl0MW9b6mTM',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});