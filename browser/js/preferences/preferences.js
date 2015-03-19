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
				'Museums',
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

app.controller('PrefCtrl', function (AUTH_EVENTS, $rootScope, $scope, $state, $stateParams, PrefBuilder, $http){
	$scope.preferences = PrefBuilder.preferenceInputs;
	$scope.test = "Test";
	$scope.foods = PrefBuilder.foods;
	$scope.events = PrefBuilder.events;
	$scope.nights = PrefBuilder.nights;

	$scope.submitPreference = function(){
		var path_to_save = '/api/user/' + $scope.user._id + '/savepreferences'; 
		$http.post(path_to_save,$scope.preferences).then(function(res){
			console.log(res.data);
			$rootScope.$broadcast(AUTH_EVENTS.userUpdated);
			$state.go('user');
		});
	};
});











