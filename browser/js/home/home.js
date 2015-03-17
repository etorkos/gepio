'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, VenuesFactory) {

	$scope.doThis = function(){
		VenuesFactory.getLocationsForesquare().then(function (backedData){
			console.log(backedData.response);
		})
	}
});