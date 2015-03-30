'use strict';
app.config(function ($stateProvider) {
    
    $stateProvider.state('room', {
        url: '/plan/:type/:id',
        resolve: {
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
                savedEvents: function () {
                console.log('into the second validation');
                // return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
                //     //prepend the users past choices to the dataSet, also removing duplicates. could have issue with location, also if uppercase vs lowercase
                //     angular.copy( ItemMixFactory.removeDuplicates( pastItinerary.otherEvents.concat($scope.dataSet.events)), $scope.dataSet.events);
                //     angular.copy( ItemMixFactory.removeDuplicates( pastItinerary.otherVenues.concat($scope.dataSet.venues)), $scope.dataSet.venues);
                //     console.log('finishing the resolve');
                //     return pastItinerary;
                // });
            },
            roomType : function ($stateParams){
                return $stateParams.type;
            }
        },
        controller: 'RoomCtrl',
        templateUrl: 'js/chat_room/chat_room.html'
    });


    $stateProvider.state('room.sub', {
        url: '/',
        controller: 'DateCtrl',
        templateUrl: 'js/chat_room/date.html',
        });

});
//     $stateProvider.state('room.one', {
//             url: '/',
//             // resolve: {
//             //     userValidation: function(AuthService, ResolveUserFactory, $stateParams){
//             //         console.log('resolve');
//             //         return AuthService.getLoggedInUser().then(function(user){
//             //             return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
//             //                 return user;
//             //             })
//             //         });
//             //     },
//             //     savedEvents: function($stateParams, ResolveUserFactory){
//             //         return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
//             //     //         //prepend the users past choices to the dataSet, also removing duplicates. could have issue with location, also if uppercase vs lowercase
//             //     //         // angular.copy( ItemRemixFactory.removeDuplicates( pastItinerary.otherEvents.concat($state.dataSet.events)), $state.dataSet.events);
//             //     //         // angular.copy( ItemRemixFactory.removeDuplicates( pastItinerary.otherVenues.concat($state.dataSet.venues)), $state.dataSet.venues);
//             //             console.log('finishing the resolve');
//             //             return pastItinerary;
//             //         });
//             //     }

//             // },
//             controller: 'DateCtrl',
//             templateUrl: 'js/chat_room/lunch.html',
//             });

// });
    // $stateProvider.state('room.date', {
    //     url: '/date_night/:id',
    //     resolve: {
    //         userValidation: function(AuthService, ResolveUserFactory, $stateParams){
    //             console.log('resolve');
    //             return AuthService.getLoggedInUser().then(function(user){
    //                 return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
    //                     return user;
    //                 })
    //             });
    //         },
    //         savedEvents: function($stateParams, ResolveUserFactory){
    //             return ResolveUserFactory.getPastActions($stateParams.id).then(function(pastItinerary){
    //         //         //prepend the users past choices to the dataSet, also removing duplicates. could have issue with location, also if uppercase vs lowercase
    //         //         // angular.copy( ItemRemixFactory.removeDuplicates( pastItinerary.otherEvents.concat($state.dataSet.events)), $state.dataSet.events);
    //         //         // angular.copy( ItemRemixFactory.removeDuplicates( pastItinerary.otherVenues.concat($state.dataSet.venues)), $state.dataSet.venues);
    //                 console.log('finishing the resolve');
    //                 return pastItinerary;
    //             })
    //         }
    //     },
    //     controller: 'DateCtrl',
    //     templateUrl: 'js/chat_room/date.html',
    //     });


        
//     $stateProvider.state('room.lunch', {
//         url: '/lunch/:id',
//         resolve: {
//             userValidation: function(AuthService, ResolveUserFactory, $stateParams){
//                 console.log('resolve');
//                 return AuthService.getLoggedInUser().then(function(user){
//                     return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
//                         return user;
//                     })
//                 });
//             }
//         },
//         controller: 'LunchCtrl',
//         templateUrl: 'js/chat_room/lunch.html'});

//     $stateProvider.state('room.nightlife', {
//         url: '/nightlife/:id',
//         resolve: {
//             userValidation: function(AuthService, ResolveUserFactory, $stateParams){
//                 console.log('resolve');
//                 return AuthService.getLoggedInUser().then(function(user){
//                     return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
//                         return user;
//                     })
//                 });
//             }
//         },
//         controller: 'NightlifeCtrl',
//         templateUrl: 'js/chat_room/nightlife.html'});

//     $stateProvider.state('room.explore', {
//         url: '/explore/:id',
//         resolve: {
//             userValidation: function(AuthService, ResolveUserFactory, $stateParams){
//                 console.log('resolve');
//                 return AuthService.getLoggedInUser().then(function(user){
//                     return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
//                         return user;
//                     })
//                 });
//             }
//         },
//         controller: 'ExploreCtrl',
//         templateUrl: 'js/chat_room/explore.html'});

//     $stateProvider.state('room.weekend', {
//         url: '/weekend/:id',
//         resolve: {
//             userValidation: function(AuthService, ResolveUserFactory, $stateParams){
//                 console.log('resolve');
//                 return AuthService.getLoggedInUser().then(function(user){
//                     return ResolveUserFactory.resolve(user, $stateParams.id).then(function(thing){
//                         return user;
//                     })
//                 });
//             }
//         },
//         controller: 'WeekendCtrl',
//         templateUrl: 'js/chat_room/weekend.html'});

// });