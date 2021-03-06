'use strict';
app.factory('ResolveUserFactory', function(ItineraryFactory, $state, $http){
	return {
		resolve: function(user, id){
			return ItineraryFactory.getItinerary(id).then(function(itinerary){
                if(!user) user = 'tempUser';
                var auth = false;
                if(itinerary.users){
                    itinerary.users.forEach(function(userId){
                        if(userId === user._id){
                            console.log('User is authorized');
                            auth = true;
                            return user;
                        }
                    });
                }
                if(!auth) {
                    console.log('User is not authorized to enter room');
                    $state.go('home');
                }
            });
		},
        getPastActions: function(itineraryId){
            // console.log('called getPastActions');
            return ItineraryFactory.getItinerary(itineraryId).then(function(itinerary){
                // console.log('back into getPastActions with', itinerary);
                return itinerary;
            }, function(reject) {
                // console.log("im rejected ", reject);
            })
        }
    }
})