'use strict';
var router = require('express').Router();
var yelp = require('yelp');
var http = require('http');
var querystring = require("querystring");

var yelp_client = yelp.createClient({
	"consumer_key": "dJs9nnzSGymTp3sNWgOBwg",
	"consumer_secret": "PHKlEhNoQnMVKUqlqkgYrHju-24",
	"token": "K5YvukEBKvpov4KPKKNFkBrSNILaO_8n",
	"token_secret": "dzKKvUE3WQjqb4aEIWT3Zza38vk"
});

var foursquareId = "0RJHOSIA5K2RGK3J3SPOYNMET0HFOLDI0SGMIGQ1YVO0JSMJ";
var foursquareClientSecret="1POC3EVMA3WZ3S01X0AINBTTVY0VHALFN0IVD0PYHCG1AW1M";
var date = 20150317;

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

router.post('/yelp/search', function (req, res){
	yelp_client.search({term: "Fraunces", location: "New York"}, function (err, data){
		res.json(data);
	});
});
router.get('/foursquare/locations', function (req, res, next){
	var date = dateFunction();
	console.log(req.query);
	http.get('https://api.foursquare.com/v2/venues/search?ll='+req.body.coordinates+'&oauth_token=UMSMDY2RN23B1VRQXPFUGIZHLZLD4FHPM2BJHNOJBGE13AIP&v='+dateFunction(), function (response){
		console.log(response.data);
		// return response.data;
		res.send(200);
	});
});

router.post('/opentable/search',function (req, res, next){
	var city = req.body.city;
	var addon = querystring.stringify({city : city});
	http.get('http://opentable.herokuapp.com/api/restaurants?' + addon, function (opres){
		// console.log("opentable" + opres.statusCode);
		opres.setEncoding('utf8');
		var body = "";
		opres.on('data',function (chunk){
			body += chunk;
		});
		opres.on('end',function(){
			res.json(JSON.parse(body));
		});
	})
	.on('error',function (e){
		console.log("error: " + e.message);
	});
});

router.post('/restaurants/search', function (req, res, next){
	var city = req.body.city;

});

module.exports = router;