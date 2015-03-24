'use strict';
app.directive('stopPropagation', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr) {
            elem.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});