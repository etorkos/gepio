'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('final-itinerary', {
		url: '/final-itinerary',
		controller: 'IntineraryCtrl',
		templateUrl: 'js/final_itinerary/final_itinerary.html'
	});
});

app.controller('IntineraryCtrl', function ($scope, $state, $stateParams, uiGmapGoogleMapApi, MessageFactory){

});

