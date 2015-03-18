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

router.post('/yelp/search', function (req, res){
	yelp_client.search({term: "Fraunces", location: "New York"}, function (err, data){
		res.json(data);
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
		console.log("error: " + e.message)
	});
});

module.exports = router;