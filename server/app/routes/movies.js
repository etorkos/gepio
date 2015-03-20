'use strict';
var router = require('express').Router();
var showtimes = require('showtimes');

router.get('/search', function (req, res){
	var ll = req.query.lat + "," + req.query.lon;
	var shows = showtimes(ll, {});
	shows.getTheaters(function (err, theaters){
		if (!err) res.json(theaters);
		else console.log(err);
	});
});

module.exports = router;