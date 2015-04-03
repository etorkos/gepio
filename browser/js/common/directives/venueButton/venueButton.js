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
                // console.log(item);
                ChatroomFactory.down_vote(item);
                // scope.votes--;
                VotingFactory.downVote(item).then(function (item){
                    DataSetFactory.reorderData(item).then(function (sorted){       
                        $rootScope.$broadcast('SetVotes');
                        VotingFactory.sortDatabase(sorted).then(function (response){
                            console.log(response.data);
                        });
                    });
                });
            };
            $scope.upvoteVenue = function(item){
                //upvote by sockets
                console.log('click on up')
                ChatroomFactory.up_vote(item);

                VotingFactory.upVote(item).then(function (item){
                    DataSetFactory.reorderData(item).then(function (sorted){
                        $rootScope.$broadcast('SetVotes');
                        VotingFactory.sortDatabase(sorted).then(function (response){
                            console.log(response.data);
                        });
                    });
                });
            };
        }
    };
});