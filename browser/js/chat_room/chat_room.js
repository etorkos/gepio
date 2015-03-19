'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });

    $stateProvider.state('room.date', {
        url: '/plan/date_night',
        controller: 'DateCtrl',
        templateUrl: 'js/char_room/date.html'});

});

app.controller('RoomCtrl', function($scope, $state){

    // $scope.date= new Date();

    $scope.toMaps = function(){
        $state.go('maps')//verify route destination
    }


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


});
