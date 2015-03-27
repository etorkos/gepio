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
            userValidation: function(AuthService, $stateParams, ItineraryFactory, $state){
                console.log('resolve');
                AuthService.getLoggedInUser().then(function(user){
                    console.log('user', user)
                    console.log('stateParams', $stateParams)
                    ItineraryFactory.getUsers($stateParams.id).then(function(allAuthUserIds){
                        //gets back an array of all users
                        console.log('back from ItineraryFactory',allAuthUserIds);
                        if(!user){
                            user = 'tempUser';
                        }
                        var auth = false;
                        console.log('in resolve...', user, allAuthUserIds)
                        allAuthUserIds.forEach(function(userId){
                            if(userId === user._id){
                                auth = true;
                                return;
                            }
                        })
                        if(!auth){
                             $state.go('home');
                        }
                       
                    })
                })
            }
        },
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html',
        });

    $stateProvider.state('room.lunch', {
        url: '/lunch/:id',
        controller: 'LunchCtrl',
        templateUrl: 'js/chat_room/lunch.html'});

    $stateProvider.state('room.nightlife', {
        url: '/nightlife/:id',
        controller: 'NightlifeCtrl',
        templateUrl: 'js/chat_room/nightlife.html'});

    $stateProvider.state('room.explore', {
        url: '/explore/:id',
        controller: 'ExploreCtrl',
        templateUrl: 'js/chat_room/explore.html'});

    $stateProvider.state('room.weekend', {
        url: '/weekend/:id',
        controller: 'WeekendCtrl',
        templateUrl: 'js/chat_room/weekend.html'});

});