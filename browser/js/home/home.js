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
    })
});

app.controller('HomeCtrl', function ($scope, VenuesFactory, $state) {

	$scope.myInterval = 5000;
	var slides = $scope.slides = [{
		image: 'http://blog.goodmeasuremeals.com/wp-content/uploads/NYC-food-market.jpg',
		text: 'Engage local culture with NYC community markets'
	},
	{
		image:'http://www.musicalamerica.com/mablogs/wp-content/uploads/2011/06/MG_4338smaller1.jpg',
		text: 'Explore family friendly culture'
	}];
	$scope.doThis = function(){
		VenuesFactory.getLocationsYelp().then(function (returnedData){
			console.log(returnedData);
		});
	}

	$scope.openTable = function(){
		VenuesFactory.getLocationsOpenTable($scope.city).then(function (returnedData){
			$scope.openTableRestaurants = returnedData;
		});
	}

	$scope.city = "New York";

	$scope.options = [{name: 'Romantic Night Out'},{name: 'Reunion with Friends'},{name: 'Barcrawl!'},{name: 'Whats for lunch?'} ];

	$scope.redirect = function(id){
		$state.go('room.date');
	}
});

