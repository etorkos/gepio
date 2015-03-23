'use strict';
app.directive('chatBar', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chatBar/chatBar.html',
		link: function(scope,element,attribute){
			console.log(element)
		}
	};
});