'use strict';
app.controller('RoomCtrl', function($scope, $state, MessageFactory, ChatroomFactory, ItineraryFactory, POIFactory, $rootScope){
    //save the id to chatroom factory
    // console.log('into the chatroom', $rootScope.ItineraryId);
    if($rootScope.ItineraryId){
        ChatroomFactory.set_itinerary_id($rootScope.ItineraryId);
        ChatroomFactory.get_or_create_room().then( function (data){
            // console.log('current chatroom id', ChatroomFactory.current_chatroom_id);
            $scope.message_to_display = data.messages;
        }).then(function(thing){
            // console.log($rootScope.ItineraryId);
            ItineraryFactory.getItinerary($rootScope.ItineraryId).then(function(itinerary){
                // console.log('itinerary ',itinerary);
                $scope.inviteStatus = itinerary.inviteStatus;
                // console.log('now scope ',$scope.inviteStatus);
            });
        });
    }
    
    $scope.invite = false;
    $scope.invite_friends = function(){
        $scope.invite = !$scope.invite;
        // console.log($scope.invite);
        // var itinerary_id = ChatroomFactory.get_itinerary_id();
        // ChatroomFactory.open_invitation(itinerary_id);
    };


     //needs to be dynamically set

    $scope.inviteToggle = function (){
        ItineraryFactory.toggleInviteStatus($rootScope.ItineraryId).then(function (response){
            console.log('The new invite status is', response.status);
            if(response.status == 'closed') $scope.inviteStatus = 'closed';
            else $scope.inviteStatus = 'open';
        })
    }

    $scope.toMaps = function(){
        $state.go('map', { id: ItineraryFactory.setActiveParams.id, type: ItineraryFactory.setActiveParams.type });//verify route destination
    };

    $scope.today = function() {
        $scope.dt = POIFactory.date; //date object we are using
    };
    $scope.today();

    $rootScope.$on('changeTheDate', function (event, args){
        console.log("CHANGE THE DATE!", args.date);
        $scope.dt = args.date;
    });

    $scope.exportDate = function(){
        ItineraryFactory.changeEventsDate($scope.dt, $scope.dataSet.events);
    }
        POIFactory.date = $scope.dt;

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