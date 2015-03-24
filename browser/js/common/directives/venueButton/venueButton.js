'use strict';
app.directive('venueButton', function (PrefBuilder) {
    return {
        restrict: 'E',
        scope: {
        	data: '='
        },
        templateUrl: 'js/common/directives/venueButton/venueButton.html',
        link: function (scope, elem, attr){
            scope.votes = 0;
            scope.isClicked = false;
            scope.setClicked = function (){
                scope.isClicked = !scope.isClicked;
            }
            scope.downvoteVenue = function(){
                scope.votes--;
                $(elem.find('button')[1]).attr('disabled', true);
                $(elem.find('button')[0]).attr('disabled', false);
            }
            scope.upvoteVenue = function(){
                scope.votes++;
                $(elem.find('button')[1]).attr('disabled', false);
                $(elem.find('button')[0]).attr('disabled', true);
            }
        }
    };
});