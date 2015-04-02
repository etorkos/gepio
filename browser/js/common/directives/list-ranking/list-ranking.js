'use strict';
app.directive('listRanking', function(){
	return{
		restict: 'E',
		scope: {
			myPlace: '='
		},
		controller: function($scope, VotingFactory, ChatroomFactory){

			$scope.downvote = function(item){
				VotingFactory.downVote(item);
				ChatroomFactory.down_vote(item);
			};

			$scope.upvote = function(item){
				VotingFactory.upVote(item);
				ChatroomFactory.up_vote(item);
			};

		},
		templateUrl: 'js/common/directives/list-ranking/list-ranking.html'
	};
});