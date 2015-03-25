'use strict';
app.factory('VotingFactory', function (){
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
		upVote: function(item){
			item.votes++;
		},
		downVote: function(item){
			item.votes--;
			// if(item.ranking < roomMembers.length)
			// 	removeItem(item);
		}
	};	
});