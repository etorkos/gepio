'use strict';
app.config(function ($stateProvider) {
    
    $stateProvider.state('room', {
        url: '/plan',
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });


    $stateProvider.state('room.sub', {
        url: '/:type/:id',
        resolve: {
            roomType : function ($stateParams, POIFactory){
                console.log('part 3');
                if ($stateParams.type === 'config1') POIFactory.hasEvents = false;
                else POIFactory.hasEvents = true;
                return $stateParams.type;
            },
            userValidation: function(AuthService, ResolveUserFactory, $stateParams){
                console.log('resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
                        console.log('finished first resolution');
                        return user;
                    })
                });
            },
            // savedEvents: function($stateParams, ResolveUserFactory, ItemMixFactory, $scope){
            savedEvents: function( $stateParams, ResolveUserFactory, ItemMixFactory ){   
                console.log('into the second validation');
            //     return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
            //         //prepend the users past choices to the dataSet, also removing duplicates. could have issue with location, also if uppercase vs lowercase
            //         angular.copy( ItemMixFactory.removeDuplicates( pastItinerary.otherEvents.concat($scope.dataSet.events)), $scope.dataSet.events);
            //         angular.copy( ItemMixFactory.removeDuplicates( pastItinerary.otherVenues.concat($scope.dataSet.venues)), $scope.dataSet.venues);
            //         console.log('finishing the resolve');
            //         return pastItinerary;
            //     });
            }
        },
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html',
        });

});
