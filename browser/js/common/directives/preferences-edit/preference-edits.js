'use strict';
app.directive('preferencesEdit', function (PrefBuilder, PreferenceFactory, AuthService, $timeout, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/preferences-edit/preferences-edit.html',
        controller: 'PrefCtrl',
        link: function (scope, elem, attr){
        	AuthService.getLoggedInUser().then(function (user){
                scope.user = user;
            });
        	scope.updatePreferences = function (){
        		PreferenceFactory.updatePreferences(scope.user._id, PrefBuilder.preferenceInputs).then(function (data){
        			console.log(data);
        			scope.updated = true;
                    $rootScope.$broadcast("PreferencesAdded");
        			$timeout(function (){ scope.updated = false }, 3000);
        		});
                alert("Preferences updated!");
        	}
        }
    };
});