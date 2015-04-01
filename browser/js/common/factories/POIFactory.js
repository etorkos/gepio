'use strict';
app.factory('POIFactory', function (){
	var factory = {};
	factory.date = new Date();
	factory.hasEvents = false;
	factory.allPOIsReturned = false;
	return factory;
});