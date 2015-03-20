'use strict';

app.factory('GeolocationFactory', function (){
	var factory = {};
	factory.latitude;
	factory.longitude;

	factory.getGeo = function(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function (position){
				factory.latitude = position.coords.latitude;
				factory.longitude = position.coords.longitude;
			});
		} 
		else console.log("Geolocation is not supported by this browser");
	}

	return factory;
});