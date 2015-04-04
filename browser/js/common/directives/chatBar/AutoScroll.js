'use strict';
app.directive('autoScroll', function () {
  return {
    scope: {
      autoScroll: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('autoScroll', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
})