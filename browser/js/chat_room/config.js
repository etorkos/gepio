'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });

    $stateProvider.state('room.date', {
        url: '/date_night/:id',
        resolve: {
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        return user;
                    })
                });
            }
        },
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html',
        });

    $stateProvider.state('room.lunch', {
        url: '/lunch/:id',
        resolve: {
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        return user;
                    })
                });
            }
        },
        controller: 'LunchCtrl',
        templateUrl: 'js/chat_room/lunch.html'});

    $stateProvider.state('room.nightlife', {
        url: '/nightlife/:id',
        resolve: {
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        return user;
                    })
                });
            }
        },
        controller: 'NightlifeCtrl',
        templateUrl: 'js/chat_room/nightlife.html'});

    $stateProvider.state('room.explore', {
        url: '/explore/:id',
        resolve: {
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        return user;
                    })
                });
            }
        },
        controller: 'ExploreCtrl',
        templateUrl: 'js/chat_room/explore.html'});

    $stateProvider.state('room.weekend', {
        url: '/weekend/:id',
        resolve: {
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        return user;
                    })
                });
            }
        },
        controller: 'WeekendCtrl',
        templateUrl: 'js/chat_room/weekend.html'});

});