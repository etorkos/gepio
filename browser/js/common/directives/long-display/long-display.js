'use strict';
app.directive('longDisplay', function(){
	return{
		restict: 'E',
		templateUrl: 'js/common/directives/long-display/long-display.html',
		link: function(scope, el, attrs){
			// var displayParams = ['events', 'venues'];
			// if(arrPrm.indexOf('events') !== -1 && arrPrm.indexOf('venues'))
			scope.eventType = 'Restaurants';
		}
	};
});