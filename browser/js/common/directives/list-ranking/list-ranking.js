'use strict';
app.directive('listRanking', function(){
	return{
		restict: 'E',
		scope: {
			myPlace: '='
		},
		controller: function($scope){

			$scope.allPlaces = [];

			function removeFromList (scopeDset, item){
				var loc = -1;
				for(var a = 0, len = scopeDset.length; a < len; a++){
						if(scopeDset[a].name === item.name){
							console.log('match at location',a)
							loc = a;
							break;
						}
					}
				return scopeDset.splice(loc, 1);
			}
			
			var checkRanking = function(item){//will probably change to set all rankings to 0
				if(!item.hasOwnProperty('ranking'))
					item.ranking = 0;
			};
			
			$scope.downvote = function(item){
				checkRanking(item)				
				item.ranking--;
				// if(item.ranking === -5) //check based on people in room for removal
					// item.removeFromList($scope.dataSet.);
			};

			$scope.upvote = function(item){
				checkRanking(item)
				item.ranking++;
			};

		},
		templateUrl: 'js/common/directives/list-ranking/list-ranking.html'
	};
});