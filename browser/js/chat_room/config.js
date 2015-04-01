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
            roomType : function ($stateParams, POIFactory){
                console.log('part 3');
                if ($stateParams.type === 'config1') POIFactory.hasEvents = false;
                else POIFactory.hasEvents = true;
                return $stateParams.type;
            },
<<<<<<< HEAD
            // userValidation: function(AuthService, ResolveUserFactory, $stateParams){
            //     console.log('resolve');
            //     return AuthService.getLoggedInUser().then(function(user){
            //         return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
            //             console.log('finished first resolution');
            //             return user;
            //         })
            //     });
            // },
            // savedEvents: function($stateParams, ResolveUserFactory, ItemMixFactory, $scope){
            savedEvents: function ($stateParams, ResolveUserFactory, ItemMixFactory, ItineraryFactory, DataSetFactory){   
                if (!DataSetFactory.isNew){
                    ItineraryFactory.setActiveParams = { id: $stateParams.id, type: $stateParams.type };
                    ItineraryFactory.getItinerary($stateParams.id).then(function (itinerary){
                        DataSetFactory.insertAndUpdate(itinerary.otherVenues, itinerary.otherEvents);
                    });
                }
            }
        },

        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html'
    });

    $stateProvider.state('room.loading', {
        url: '/:type/:id/redirect',
        controller: 'LoadingCtrl',
        templateUrl: 'js/chat_room/loading.html'
    });

=======
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
                // return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
                //     return pastItinerary;
                // });
            }
        }
    });
>>>>>>> origin/master
});

