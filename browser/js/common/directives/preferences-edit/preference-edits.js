'use strict';
app.directive('preferencesEdit', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/preferences-edit/preferences-edit.html',
        controller: 'PrefCtrl'
    };
});