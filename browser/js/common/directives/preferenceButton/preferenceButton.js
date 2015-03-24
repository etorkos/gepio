'use strict';
app.directive('preferenceButton', function (PrefBuilder) {
    return {
        restrict: 'E',
        scope: {
        	data: '=',
        	type: '='
        },
        templateUrl: 'js/common/directives/preferenceButton/preferenceButton.html',
        link: function (scope, elem, attr){
        	scope.isSet = false;
        	scope.setPreference = function (input, type){
        		if (!scope.isSet){
	        		elem.css('opacity', '0.3');
	        		elem.css('color', 'black');
	        		elem.css('font-weight', 'bold');
	        		PrefBuilder.preferenceInputs[type].push(JSON.stringify(input));
	        		scope.isSet = true;
        		}
        		else {
        			elem.css('opacity', '1.0');
        			elem.css('color', 'white');
        			elem.css('font-weight', 'normal');
        			var index = 0;
        			PrefBuilder.preferenceInputs[type].forEach(function (set, i){
        				if (JSON.stringify(input) == set) index = i;
        			});
        			PrefBuilder.preferenceInputs[type].splice(index, 1);
        			scope.isSet = false;
        		}
        	};
        }
    };
});