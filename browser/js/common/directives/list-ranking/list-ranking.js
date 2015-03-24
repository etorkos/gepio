'use strict';
app.directive('listRanking', function(){
	return{
		restict: 'E',
		scope: {
			myPlace: '='
		},
		controller: function($scope){
			
			var checkRanking = function(item){
				if(!item.hasOwnProperty('ranking'))
					item.ranking = 0;
			};
			
			$scope.downvote = function(item){
				checkRanking(item)				
				item.ranking--;
				console.log(item.ranking);	
			};

			$scope.upvote = function(item){
				checkRanking(item)
				item.ranking++;
				console.log(item.ranking);

			};

		},
		templateUrl: 'js/common/directives/list-ranking/list-ranking.html'
	};
});