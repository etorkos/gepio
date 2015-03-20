'use strict';
app.factory('MessageFactory', function(){
	var factory = {};
	factory.messages = ['Why am I the only one in here?','I\'m so lonely'];
	factory.active = false;
	factory.changeActive = function(){
		factory.active = !factory.active;
		console.log(factory.active);
	}
	return factory;
});