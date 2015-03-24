'use strict';
app.directive('listRanking', function(){
	return{
		restict: 'E',
		scope: {
			myPlace: '='
		},
		controller: function($scope){
			
			$scope.downvote = function(item){

			};

			$scope.upvote = function(item){

			};
		},
		templateUrl: 'js/common/directives/list-ranking/list-ranking.html'
	};
});