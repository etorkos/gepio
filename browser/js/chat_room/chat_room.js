'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });

    $stateProvider.state('room.date', {
        url: 'date_night',
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html'});

});

app.controller('RoomCtrl', function($scope, $state, MessageFactory){

    $scope.toMaps = function(){
        $state.go('map');//verify route destination
    };


    $scope.today = function() {
        $scope.dt = new Date(); //date object we are using
    };
    $scope.today();

    $scope.clear = function () {
     $scope.dt = null;
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.active = MessageFactory.active;
    $scope.makeActive = function(){
        MessageFactory.changeActive();
        $scope.active = !$scope.active;
    }


});

app.controller('DateCtrl', function($scope){


});