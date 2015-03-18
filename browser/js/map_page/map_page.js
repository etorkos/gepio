'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('map', {
		url: '/map/:id',
		controller: 'MapCtrl',
		templateUrl: 'js/map_page/map_page.html'
	});
});

app.controller('MapCtrl', function ($scope, $state, $stateParams, PrefBuilder){

});