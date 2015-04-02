'use strict';
var app = angular.module('FourSquarePlusApp', ['ui.router', 'fsaPreBuilt', 'ui.bootstrap', 'uiGmapgoogle-maps']);

app.controller('MainController', function ($scope, $rootScope, AuthService, AUTH_EVENTS, GeolocationFactory, MoviesFactory, VenuesFactory, EventsFactory, $q, UserFactory, ItineraryFactory, POIFactory, DataSetFactory,ChatroomFactory) {
    //save login user info, don't delete, important
    function saveUserToScope(){
        AuthService.getLoggedInUser().then(function(user){
            // console.log(user)
            $scope.user = user;
            $scope.isAuthenticated = AuthService.isAuthenticated();
            if($scope.user && $scope.user.foursquareraw) $scope.raw = JSON.parse($scope.user.foursquareraw);
            ChatroomFactory.bind_user_id($scope.user._id);
        });
    }
    saveUserToScope();


    //check invitation
    socket.on('invitation',function(data){
        alert('invitation received');
        saveUserToScope();
    })

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

    $scope.dataSet = { events: [], venues: [] };

    $rootScope.ItineraryId = ''; //declaration to be instantiated when user immediately redirects to itinerary page

    GeolocationFactory.getGeo().then(function(){
        if (GeolocationFactory.latitude && GeolocationFactory.longitude){
            if(!UserFactory.checkUser($scope.user)){
                console.log("No user/preferences");
                $scope.dataSet.movies =  null;
                $scope.totals = 0;
                UserFactory.generateInitialGenericPOIs().then(function (data){
                    $scope.dataSet.movies = data.movies;
                    $scope.dataSet.events = data.events;
                    $scope.dataSet.venues = data.venues;
                    DataSetFactory.movies = data.movies;
                    DataSetFactory.events = data.events;
                    DataSetFactory.venues = data.venues;
                    DataSetFactory.genericEvents = data.events;
                    DataSetFactory.genericVenues = data.venues;
                    $scope.totals = data.totals;
                }).then(function (){
                    UserFactory.generateMorePOIs(['109', '119'], ['52e81612bcbc57f1066b79f1','4bf58dd8d48988d110941735','4bf58dd8d48988d1c2941735']).then(function (data){
                        data.events.forEach(function (arr, index){
                            $scope.totals += arr.length;
                            $scope.dataSet.events = $scope.dataSet.events.concat(arr);
                            DataSetFactory.events = DataSetFactory.events.concat(arr);
                            DataSetFactory.genericEvents = DataSetFactory.genericEvents.concat(arr);
                        });
                        data.venues.forEach(function (arr, index){
                            $scope.totals += arr.length;
                            $scope.dataSet.venues = $scope.dataSet.venues.concat(arr);
                            DataSetFactory.venues = DataSetFactory.venues.concat(arr);
                            DataSetFactory.genericVenues = DataSetFactory.genericVenues.concat(arr);
                        });
                        POIFactory.allPOIsReturned = true;
                        $rootScope.$broadcast('allDataReturned');
                        $rootScope.$bootstrap('SetVotes');
                    });
                });
            }
            else {
                console.log('User has preferences');
                $scope.dataSet.movies = null;
                $scope.totals = 0;
                var preferences = UserFactory.parseUserPreferences($scope.user);
                UserFactory.generateInitialCustomPOIs(preferences.events[0], preferences.foods[0]).then(function (data){
                    $scope.dataSet.events = data.events;
                    $scope.dataSet.venues = data.venues;
                    DataSetFactory.events = data.events;
                    DataSetFactory.venues = data.venues;
                    DataSetFactory.genericEvents = data.events;
                    DataSetFactory.genericVenues = data.venues;
                    $scope.totals += data.totals;
                    preferences.events.unshift();
                    preferences.foods.unshift();
                }).then(function (){
                    UserFactory.generateMorePOIs(preferences.events, preferences.foods).then(function (data){
                        if (ItineraryFactory.setActiveParams) ItineraryFactory.updateEventsSet(data.events);
                        data.events.forEach(function (arr){
                            $scope.totals += arr.length;
                            $scope.dataSet.events = $scope.dataSet.events.concat(arr);
                            DataSetFactory.events = DataSetFactory.events.concat(arr);
                            DataSetFactory.genericEvents = DataSetFactory.genericEvents.concat(arr);
                        });
                        data.venues.forEach(function (arr){
                            $scope.totals += arr.length;
                            $scope.dataSet.venues = $scope.dataSet.venues.concat(arr);
                            DataSetFactory.venues = DataSetFactory.venues.concat(arr);
                            DataSetFactory.genericVenues = DataSetFactory.genericVenues.concat(arr);
                        });
                    }).then(function (){
                        // if (preferences.hasMovies){
                        //     MoviesFactory.getMovies().then(function (movies){
                        //         $scope.dataSet.movies = movies;
                        //         $scope.totals += movies.length;
                        //         POIFactory.allPOIsReturned = true;
                        //         DataSetFactory.movies = movies;
                        //     });
                        // }
                        // else {
                            POIFactory.allPOIsReturned = true;
                            $rootScope.$broadcast('allDataReturned');
                            $rootScope.$broadcast('SetVotes');
                        //}
                    });
                });
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