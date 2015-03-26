'use strict';
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