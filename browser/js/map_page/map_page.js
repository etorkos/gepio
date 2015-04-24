'use strict';
app.config(function ($stateProvider){
	$stateProvider.state('map', {
		url: '/map/:type/:id',
		controller: 'MapCtrl',
		templateUrl: 'js/map_page/map_page.html'
	});
});


app.controller('MapCtrl', function ($scope, $state, uiGmapIsReady, checkDateFilter, $stateParams, uiGmapGoogleMapApi, MessageFactory, VotingFactory, GeolocationFactory, POIFactory, $filter, ChatroomFactory, SocketReaction, DataSetFactory, $rootScope, $q){
	uiGmapGoogleMapApi.then(function (maps){
		$scope.map = { 
			center: { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude },
			zoom: 13
		};

		$scope.directionsService = new maps.DirectionsService();
    	$scope.directionsDisplay = new maps.DirectionsRenderer();
    	var mainEvent = checkDateFilter($scope.data.events, $scope.date);
    	if(mainEvent.length){
    		var request = {
				origin: new maps.LatLng(
					$scope.data.venues[0].location.lat,
					$scope.data.venues[0].location.lng
				),
				destination: new maps.LatLng(
					mainEvent[0].venue.latitude, 
					mainEvent[0].venue.longitude
				),
				travelMode: maps.TravelMode['WALKING'],
				optimizeWaypoints: true
			};
			uiGmapIsReady.promise(1)
			.then(function(instances){
				$scope.directionsDisplay.setMap(instances[0].map);
				$scope.directionsService.route(request, function(response, status) {
			        if (status == google.maps.DirectionsStatus.OK) {
			        	console.log('finished directions with ', response, status);
			        	console.log('you will go ', response.routes[0].legs[0].distance.text, 'in', response.routes[0].legs[0].duration.text);
			            // $scope.directionsDisplay.setDirections(response);
			        }
			        
			    });
			})
			
    	}
	});

	// console.log($stateParams.type);
	$scope.user_location = { latitude: GeolocationFactory.latitude, longitude: GeolocationFactory.longitude };
	$scope.active = MessageFactory.active;
	$scope.messages = MessageFactory.messages;
	$scope.makeActive = function (){
		MessageFactory.changeActive();
		$scope.active = !$scope.active;
	};

	$scope.refresh = true;
	$scope.hasEvents = POIFactory.hasEvents;

	$scope.date = POIFactory.date;
	POIFactory.setMapDate();
	$rootScope.$on('mapDateSet', function (event, args){
		$scope.date = args.date;
	});	

	$scope.data = { events: DataSetFactory.events, venues: DataSetFactory.venues };

	// console.log($scope.data.venues);

	$scope.goToPlan = function (){
		$state.go('room.sub', { id: $stateParams.id, type: $stateParams.type });
	}

	$scope.finalizeItinerary = function(){
		$state.go('final-itinerary', { id: $stateParams.id, type: $stateParams.type });
	}

	$scope.centerAndZoom = function (item){
		if (item.location) $scope.map.center = { latitude: item.location.lat, longitude: item.location.lng };
		else $scope.map.center = { latitude: item.venue.latitude, longitude: item.venue.longitude };
		$scope.map.zoom = 18;
	}

	if($stateParams.type == 'config1')
		$scope.showEvents = false;
	else
		$scope.showEvents = true;
	SocketReaction.socket_on_vote(socket);

});

app.service('passService', function(){
	//can remove once database persistence is working with each room
	var finalData;

	var addFinal = function(fData){
		finalData = fData;
	};
	var getFinal = function(){
		return finalData;
	};

	return{
		addFinal: addFinal,
		getFinal: getFinal
	};
});

