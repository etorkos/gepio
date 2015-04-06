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
            $scope.top_eights = function(arr){
                var result = [];
                for(var i = 0; i < arr.length; i++){
                    var current = arr[i]
                    if(result.length < 8){
                        result.push(current);
                        result.sort(function(a,b){return b.vote - a.vote})
                    }
                    else if(current.vote > result[result.length - 1].vote){
                        result.push(current);
                        result.sort(function(a,b){return b.vote - a.vote}).splice(result.length - 1, 1)
                    }
                }
                return result;
            }
            $scope.downvoteVenue = function(item){
                // console.log(item);
                // scope.votes--;
                VotingFactory.downVote(item).then(function (item){
                    DataSetFactory.reorderData(item).then(function (sorted){       
                        $rootScope.$broadcast('SetVotes');
                        VotingFactory.sortDatabase(sorted).then(function (response){
                            // console.log(response.data);
                            //only venues top eights are sent
                            if(!item.eventId){
                                var eights = $scope.top_eights(DataSetFactory.venues)
                                ChatroomFactory.down_vote(item,eights);
                            }
                            else{
                                //events
                                ChatroomFactory.down_vote(item);
                            }
                        });
                    });
                });

            };
            $scope.upvoteVenue = function(item){
                //upvote by sockets

                VotingFactory.upVote(item).then(function (item){
                    DataSetFactory.reorderData(item).then(function (sorted){
                        $rootScope.$broadcast('SetVotes');
                        VotingFactory.sortDatabase(sorted).then(function (response){
                            // console.log(response.data);
                            // console.log(item)
                            if(!item.eventId){
                                var eights = $scope.top_eights(DataSetFactory.venues)
                                ChatroomFactory.up_vote(item,eights);
                            }
                            else{
                                //events
                                ChatroomFactory.down_vote(item);
                            }
                        });
                    });
                });

            };
        }
    };
});