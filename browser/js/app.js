'use strict';
var app = angular.module('FourSquarePlusApp', ['ui.router', 'fsaPreBuilt', 'ui.bootstrap', 'uiGmapgoogle-maps']);

app.controller('MainController', function ($scope,$rootScope,AuthService, AUTH_EVENTS, GeolocationFactory, MoviesFactory, VenuesFactory, EventsFactory, $q) {
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

    GeolocationFactory.getGeo().then(function (){
        if (GeolocationFactory.latitude && GeolocationFactory.longitude){
            if(!$scope.user){
                $scope.dataSet = { movies: null, events: [], venues: [] };
                MoviesFactory.getMovies().then(function (data){
                    $scope.dataSet.movies = data;
                });
                var categories = ['103','109','119'];
                categories.forEach(function (category){
                    EventsFactory.getEvents(category).then(function (data){
                        console.log('Events ', data.length);
                        // $scope.dataSet.events.push(data);
                        $scope.dataSet.events = $scope.dataSet.events.concat(data) || data;
                    });
                });
                var venueCategories = ['4bf58dd8d48988d10c941735','52e81612bcbc57f1066b79f1','4bf58dd8d48988d110941735','4bf58dd8d48988d1c2941735'];
                venueCategories.forEach(function (category){
                    VenuesFactory.getVenues(category).then(function (data){
                        console.log('Venues ', data.length);
                        // $scope.dataSet.venues.push(data);
                        $scope.dataSet.venues = $scope.dataSet.venues.concat(data) || data;
                    });
                });
            }
            else {
                
            }
        };
    });
    
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