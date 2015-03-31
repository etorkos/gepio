'use strict';
app.controller('RoomCtrl', function($scope, $state, MessageFactory, POIFactory, ItineraryFactory){

    

    $scope.toMaps = function(){
        $state.go('map', { id: ItineraryFactory.setActiveParams.id, type: ItineraryFactory.setActiveParams.type });//verify route destination
    };

    $scope.today = function() {
        $scope.dt = new Date(); //date object we are using
        POIFactory.date = $scope.dt;
    };
    $scope.today();

    $scope.exportDate = function(){
        ItineraryFactory.changeEventsDate($scope.dt, $scope.dataSet.events);
        POIFactory.date = $scope.dt;
    }

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