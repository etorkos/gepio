'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('preferences', {
		url: '/preferences/:user',
		controller: 'PrefCtrl',
		templateUrl: 'js/preferences/preferences.html'
	});
});

app.factory('PrefBuilder', function(){
	return {
		foods: {
			array: [
				'Italian',
				'Chinese',
				'Indian',
				'Mediterranean',
				'Mexican',
				'Spanish',
				'Portugese',
				'Ethipoian',
				'Polish',
				'German',
				'Thai',
				'Deli',
				'Burgers',
				'Vegitarian',
				'Healthy'	
			],
			type: 'foods'
		},
		events: {
			array: [
				'Movies',
				'Live Sports',
				'Live Music',
				'Live Theatre',
				'Museaums',
				'Art Exhibits',
				'Family Friendly',
				'Comedy',
				'Outdoors',
				'For Couples',
				'Air/Boat/Car Shows'
			],
			type: 'events'
		},
		nights: {
			array: [
				'Dive Bars',
				'Clubs',
				'Low Key',
				'Dancing',
				'Quiet',
				'For Couples',
				'Cheap Drinks',
				'Walking Distance',
				'LGBT Friendly',
				'Speed Dating',
				'Live Band',
				'Electronic Music'
			],
			type: 'nights'
		},
		preferenceInputs: {
			foods: [],
			events: [],
			nights: []
		}
	}
});

app.controller('PrefCtrl', function ($scope, $state, $stateParams, PrefBuilder){
	$scope.preferences = PrefBuilder.preferenceInputs;
	$scope.test = "Test";
	$scope.foods = PrefBuilder.foods;
	$scope.events = PrefBuilder.events;
	$scope.nights = PrefBuilder.nights;
});