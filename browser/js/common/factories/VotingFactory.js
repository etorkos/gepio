'use strict';
app.factory('VotingFactory', function ($http, ItineraryFactory, DataSetFactory){
	var removeItem = function (scopeDataset, item){
		var loc = -1;
		for(var a = 0, len = scopeDataset.length; a < len; a++){
				if(scopeDataset[a].name === item.name){
					console.log('match at location',a);
					loc = a;
					break;
				}
			}
		return scopeDataset.splice(loc, 1);
	};

	return {
		setUpVotes: function(items){
			//as soon as data loads into page, set up vote property
			items.map(function(item){
				if(!item.hasOwnProperty('votes'))
					item.votes = 0;
			});
		},
		downVote: function(item){
			item.votes--;
			var data = { name: item.name, votes: item.votes, itinerary: ItineraryFactory.setActiveParams.id };
			if (item.location) data.type = 'venue';
			else data.type = 'event';
			return $http.put('/api/itinerary/vote', data).then(function (res){
				console.log(res.data);
				return res.data;
			});
		},
		upVote: function(item){
			item.votes++;
			var data = { name: item.name, votes: item.votes, itinerary: ItineraryFactory.setActiveParams.id };
			if (item.location) data.type = 'venue';
			else data.type = 'event';
			return $http.put('/api/itinerary/vote', data).then(function (res){
				console.log(res.data);
				return res.data;
			});
		},
		sortDatabase: function (sorted){
			var data = { data: [], id: ItineraryFactory.setActiveParams.id, type: sorted.type };
			for (var i = 0; i < 8; i++){
				data.data.push(sorted.data[i]);
			};
			return $http.put('/api/itinerary/sort', data).then(function (res){
				return res.data;
			});
		}
	};	
});