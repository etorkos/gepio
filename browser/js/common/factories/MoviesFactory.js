'use strict';
app.factory('MoviesFactory', function ($http, GeolocationFactory){
	var factory = {};
		factory.getMovies = function (){
			var data = {
				lat: GeolocationFactory.latitude,
				lon: GeolocationFactory.longitude
			};
			return $http.get('/api/movies/search', { params: data }).then(function (res){
				var movies = [];
				res.data.forEach(function (theater){
					theater.movies.forEach(function (movie){
						var exists = false;
						movies.forEach(function (m, index){
							if (m.name == movie.name) {
								exists = true;
								movies[index].theaters.push({ name: theater.name, times: movie.showtimes });
							}
						});
						if (!exists) {
							movies.push({ name: movie.name, theaters: [ { name: theater.name, times: movie.showtimes } ] });
						}
					});
				});
				return movies;
			});
		}
	return factory;
});