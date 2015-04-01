'use strict';
app.directive('venueButton', function (PrefBuilder) {
    return {
        restrict: 'E',
        scope: {
        	data: '='
        },
        templateUrl: 'js/common/directives/venueButton/venueButton.html',
        controller: function ($scope, VotingFactory, ChatroomFactory){
            $scope.votes = 0;
            $scope.isClicked = false;
            $scope.setClicked = function (){
                $scope.isClicked = !$scope.isClicked;
            };
            $scope.downvoteVenue = function(item){
                // console.log(item);
                ChatroomFactory.down_vote(item);
                // scope.votes--;
                // $(elem.find('button')[1]).attr('disabled', true);
                // $(elem.find('button')[0]).attr('disabled', false);
                VotingFactory.downVote(item);
            };
            $scope.upvoteVenue = function(item){
                //upvote by sockets
                ChatroomFactory.up_vote(item);

                // scope.votes++;
                // $(elem.find('button')[1]).attr('disabled', false);
                // $(elem.find('button')[0]).attr('disabled', true);
                VotingFactory.upVote(item);
            };
        }
    };
});