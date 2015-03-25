'use strict';
app.directive('preferenceButton', function (PrefBuilder, AuthService) {
    return {
        restrict: 'E',
        scope: {
        	data: '=',
        	type: '='
        },
        templateUrl: 'js/common/directives/preferenceButton/preferenceButton.html',
        link: function (scope, elem, attr){
            scope.userPreferences = PrefBuilder.preferenceInputs;
            console.log(scope.userPreferences);
            // AuthService.getLoggedInUser().then(function (user){
            //     console.log(user);
            //     scope.user = user;
            // });
        	scope.isSet = false;
            for (var key in scope.userPreferences){
                scope.userPreferences[key].forEach(function (type){
                    if (scope.data.text === JSON.parse(type).text) scope.isSet = true;
                });
            }
        	scope.setPreference = function (input, type){
        		if (!scope.isSet){
	        		PrefBuilder.preferenceInputs[type].push(JSON.stringify(input));
	        		scope.isSet = true;
        		}
        		else {
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