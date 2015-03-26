'use strict';
app.directive('longDisplay', function(){
	return{
		restict: 'E',
		templateUrl: 'js/common/directives/long-display/long-display.html',
		link: function(scope, el, attrs){
			scope.eventThing = attrs.eventType;
		}
	};
});