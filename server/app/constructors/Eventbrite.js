'use strict';

var Eventbrite = function (query){
	for (var key in query){
		if (query.hasOwnProperty(key)){
			if (query[key]){
				this[key] = query[key];
			}
		}
	}
}

Eventbrite.prototype.buildUrl = function (token){
	var url = 'https://www.eventbriteapi.com/v3/events/search/?';
	for (var key in this){
		if (this.hasOwnProperty(key)){
			url += '&' + key + '=' + this[key];
		}
	}
	url += '&token=' + token;
	return url;
}

module.exports = Eventbrite;