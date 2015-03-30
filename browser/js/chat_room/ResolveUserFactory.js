'use strict';
app.factory('ResolveUserFactory', function(ItineraryFactory, $state, $http){
	return {
		resolve: function(user, id){
			return ItineraryFactory.getItinerary(id).then(function(allAuthUserIds){
                if(!user) user = 'tempUser';
                var auth = false;
                allAuthUserIds.users.forEach(function(userId){
                    if(userId === user._id){
                        auth = true;
                        return user;
                    }
                });
                if(!auth) $state.go('home');
            })
		},
        getPastActions: function(itineraryId){
            return ItineraryFactory.getItinerary(id).then(function(itinerary){
                return itinerary;
            })
        }
	}
})