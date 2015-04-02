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
                // console.log('part 3');
                if ($stateParams.type === 'config1') POIFactory.hasEvents = false;
                else POIFactory.hasEvents = true;
                return $stateParams.type;
            },
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
            savedEvents: function ($stateParams, ResolveUserFactory, ItemMixFactory, $q, ItineraryFactory, DataSetFactory, POIFactory){   
                return $q( function (resolve, reject){

                    if (!DataSetFactory.isNew){
                        console.log('Dataset is not new');
                        ItineraryFactory.setActiveParams = { id: $stateParams.id, type: $stateParams.type };
                        ItineraryFactory.getItinerary($stateParams.id).then(function (itinerary){
                            console.log('resolved first promise');
                            POIFactory.setItineraryDate(itinerary.date);
                            var factory = DataSetFactory.insertAndUpdate(itinerary.otherVenues, itinerary.otherEvents)
                                console.log('finished the resove');
                                resolve(factory);
                            }); 
                    }
                    else {
                        console.log('Dataset is new');
                        resolve(DataSetFactory.setUnmodifiedItinerary());
                    }

                })
            }
        },
    });

    $stateProvider.state('loading', {
        url: '/:type/:id/redirect',
        controller: 'LoadingCtrl',
        templateUrl: 'js/chat_room/loading.html'
    });

});

