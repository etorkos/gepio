'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');

var foursquareId = "0RJHOSIA5K2RGK3J3SPOYNMET0HFOLDI0SGMIGQ1YVO0JSMJ";
var foursquareClientSecret="1POC3EVMA3WZ3S01X0AINBTTVY0VHALFN0IVD0PYHCG1AW1M";

var dateFunction = function(){
	var fullDate = new Date();
	var year = fullDate.getFullYear().toString();
	var month = fullDate.getMonth().toString();
	var day = fullDate.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	return year+month+day;
};


router.get('/search', function (req, res, next){
	var date = dateFunction();
	console.log(req.query);
	var coordinates;
	if (req.query.latitude && req.query.longitude) coordinates = 'll=' + req.query.latitude + ',' + req.query.longitude;
	var url = 'https://api.foursquare.com/v2/venues/search?';
	if (coordinates) url += coordinates;
	for (var key in req.query){
		if (req.query.hasOwnProperty(key)){
			if (req.query[key]) {
				if (key != 'latitude' && key != 'longitude') url += '&' + key + '=' + [key];
			}
		}
	}
	url += '&oauth_token=UMSMDY2RN23B1VRQXPFUGIZHLZLD4FHPM2BJHNOJBGE13AIP&v=' + date;
	https.get(url, function (response){
		var body = "";
		response.on('data', function(chunk){
			body += chunk;
		});
		response.on('end', function(){
			res.json(JSON.parse(body));
		});
	});
});

module.exports = router;