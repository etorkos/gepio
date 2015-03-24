'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });

    $stateProvider.state('room.date', {
        url: '/date_night/:id',
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html'});

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