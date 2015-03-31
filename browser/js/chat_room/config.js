'use strict';
app.config(function ($stateProvider) {
    
    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });


    $stateProvider.state('room.sub', {
        url: '/:type/:id',
        controller : 'DateCtrl',
        templateUrl : 'js/chat_room/date.html',
        resolve: {
            roomType : function ($stateParams){
                console.log('part 3');
                return $stateParams.type;
            },
            userValidation: function(AuthService, ResolveUserFactory, $stateParams, ItineraryFactory){
                console.log('resolve');
                return ItineraryFactory.getItinerary( $stateParams.id).then(function (itinerary){
                    if (itinerary.inviteStatus == 'open') { return true };
                    return AuthService.getLoggedInUser().then(function(user){
                        return ResolveUserFactory.resolve(user, $stateParams.id).then(function ( thing){
                            console.log('finished first resolution');
                            return user;
                        })
                    });
                });  
            },
            savedEvents: function( $stateParams, ResolveUserFactory, ItemMixFactory){   
                console.log('into the second validation');
                return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
                    return pastItinerary;
                });
            }
        }
    });
});

