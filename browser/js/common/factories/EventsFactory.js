'use strict';
app.factory('EventsFactory', function ($http, GeolocationFactory){
	var factory = {};
	factory.getEvents = function (category, start_date, end_date, search){
		var data = {
			'location.within': '10km',
			'location.latitude': GeolocationFactory.latitude,
			'location.longitude': GeolocationFactory.longitude
		}
		data.categories = category;
		data.q=search;
		if (!start_date) data['start_date.range_start'] = '2015-03-21T17:16:55Z';
		else data['start_date.range_start'] = start_date;
		if (!end_date) data['start_date.range_end'] = '2015-04-16T17:16:55Z'
		else data['start_date.range_start']  = end_date;
		return $http.get('/api/events/search', { params: data }).then(function (res){
			var cleaned = [];
			console.log(res.data.events[0]);
			res.data.events.forEach(function (event){
				var holder = {};
				holder.name = event.name.text;
				holder.description = event.description;
				holder.logo = event.logo_url;
				holder.eventId = event.id;
				holder.url = event.url;
				holder.ticketInfo = event.ticket_classes;
				holder.status = event.status;
				holder.category = event.category_id;
				holder.startTime = event.start.local;
				holder.endTime = event.end.local;
				holder.venue = event.venue;
				cleaned.push(holder);
			});
			return cleaned;
		});
	};
	return factory;
});