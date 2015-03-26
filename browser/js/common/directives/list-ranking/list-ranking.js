'use strict';
app.directive('listRanking', function(){
	return{
		restict: 'E',
		scope: {
			myPlace: '='
		},
		controller: function($scope, VotingFactory){

			$scope.downvote = function(item){
				VotingFactory.downVote(item);
			};

			$scope.upvote = function(item){
				VotingFactory.upVote(item);
			};

		},
		templateUrl: 'js/common/directives/list-ranking/list-ranking.html'
	};
});