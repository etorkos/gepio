'use strict';
app.directive('venueButton', function (PrefBuilder) {
    return {
        restrict: 'E',
        scope: {
        	data: '='
        },
        templateUrl: 'js/common/directives/venueButton/venueButton.html',
        link: function ($scope, elem, attr){
            $scope.downvoteLock = function(){
                $(elem.find('button')[1]).attr('disabled', true);
                $(elem.find('button')[0]).attr('disabled', false);
            };
            $scope.upvoteLock = function(){
                $(elem.find('button')[1]).attr('disabled', false);
                $(elem.find('button')[0]).attr('disabled', true);
            };
        },
        controller: function ($scope, VotingFactory, ChatroomFactory, $rootScope, DataSetFactory){
            $scope.votes = 0;
            $scope.isClicked = false;
            $scope.setClicked = function (){
                $scope.isClicked = !$scope.isClicked;
            };
            $scope.downvoteVenue = function(item){
                console.log(item);
                // scope.votes--;
                VotingFactory.downVote(item);
            };
            $scope.upvoteVenue = function(item){
                // scope.votes++;
                VotingFactory.upVote(item).then(function (item){
                    DataSetFactory.reorderData(item).then(function (){
                        $rootScope.$broadcast('SetVotes');
                    });
                });

                //upvote by sockets
                ChatroomFactory.up_vote(item);
            };
        }
    };
});