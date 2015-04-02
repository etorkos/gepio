'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');
var foursquare = require('node-foursquare-venues')('0RJHOSIA5K2RGK3J3SPOYNMET0HFOLDI0SGMIGQ1YVO0JSMJ', '1POC3EVMA3WZ3S01X0AINBTTVY0VHALFN0IVD0PYHCG1AW1M');

router.get('/search', function (req, res){
	var ll = req.query.latitude + ',' + req.query.longitude;
	// console.log(req.query.categories);
	foursquare.venues.search({ ll: ll, categoryId: req.query.categories }, function (err, data){
		if (!err) res.json(data);
		else console.log(err);
	});
});

module.exports = router;