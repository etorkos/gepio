'use strict';
app.factory('POIFactory', function ($rootScope){
	var factory = {};
	factory.date = new Date();
	factory.hasEvents = false;
	factory.allPOIsReturned = false;
	factory.setItineraryDate = function (date){
		factory.date = new Date(date);
		$rootScope.$broadcast('changeTheDate', { date: factory.date });
	};
	return factory;
});