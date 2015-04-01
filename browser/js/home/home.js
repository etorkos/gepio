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

app.controller('HomeCtrl', function ($scope, VenuesFactory, $state, GeolocationFactory, ItineraryFactory, AuthService, DataSetFactory) {

	// $scope.myInterval = 5000;
	// var slides = $scope.slides = [{
	// 	image: 'http://blog.goodmeasuremeals.com/wp-content/uploads/NYC-food-market.jpg',
	// 	text: 'Engage local culture with NYC community markets'
	// },
	// {
	// 	image:'http://www.musicalamerica.com/mablogs/wp-content/uploads/2011/06/MG_4338smaller1.jpg',
 //   text: 'Explore family friendly culture'
	// }];


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
				console.log('redirecting');
				var dataForItinerary = ItineraryFactory.createDataSet($scope.selectedOption.name, $scope.dataSet);
				ItineraryFactory.createItinerary({ user: user, title: $scope.selectedOption.name, events: dataForItinerary , type: $scope.selectedOption }).then(function(itinerary){
					console.log('going to ', $scope.selectedOption.state, 'with', itinerary._id)
					ItineraryFactory.setActiveParams = { id: itinerary._id, type: $scope.selectedOption.type };
					DataSetFactory.isNew = true;
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