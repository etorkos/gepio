'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

    $stateProvider.state('home.login', {
    	url:'/login',
    	controller: 'LoginCtrl',
    	templateUrl: 'js/home/login.html'
    });
});

app.controller('HomeCtrl', function ($scope, VenuesFactory, $state, GeolocationFactory, ItineraryFactory, AuthService, DataSetFactory, $rootScope, POIFactory) {

	$scope.city = "New York";

	$scope.options = [
		//should make it so that we pass a kind of parameter that will do search instead
		{name: 'Whats for lunch?', type: 'config1'},
		{name: 'Reunion with Friends', type: 'config2'},
		{name: 'Romantic Night Out', type: 'config2'},
		{name: 'Lets go out tonight', type: 'config2'}];

	$scope.redirect = function(){
		AuthService.getLoggedInUser().then(function(user){
			//if you are a user and do not have any preferences, go to preference create
			if(user && ($scope.user.preferences.nights.length === 0 && $scope.user.preferences.events.length === 0 && $scope.user.preferences.foods.length === 0))
				{ 
					alert('Please set a few preferences first, so we can give you better reccommendations');
					$state.go('preferences', {user: user._id}) }
			else{
				var dataForItinerary = ItineraryFactory.createDataSet($scope.selectedOption.name, $scope.dataSet);
				ItineraryFactory.createItinerary({ user: user, title: $scope.selectedOption.name, events: dataForItinerary , type: $scope.selectedOption }).then(function(itinerary){
					ItineraryFactory.setActiveParams = { id: itinerary._id, type: $scope.selectedOption.type };
					DataSetFactory.isNew = true;
					POIFactory.date = new Date();
					//DataSetFactory.factorTheBlend(dataForItinerary);
					$state.go('room.sub', {id: itinerary._id, type: $scope.selectedOption.type});
				});	
			}
		})
		
	}
	$scope.selectedOption = {name: "Start an itinerary", state:'home'};
	$scope.showOptions = false;
	$scope.showOptionsClick = function(obj){
		console.log(obj)
		$scope.showOptions = !$scope.showOptions;
		$scope.selectedOption = obj;
	}

});