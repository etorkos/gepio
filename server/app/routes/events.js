'use strict';
var router = require('express').Router();
var http = require('http');
var https = require('https');

var evbriteClient = {
	client_secret: '5GEUAQ22R4666GUSXUUDWOZPJ7RDR3CORRFJFYKUP3UHPWTG4J',
	anonymous_oauth: 'KXPOP37CSFBT6PHADGFS'
};

router.get('/search', function (req, res){
	var url = 'https://www.eventbriteapi.com/v3/events/search/?';
	for (var key in req.query){
		if (req.query.hasOwnProperty(key)){
			if (req.query[key]){
				url += '&' + key + '=' + req.query[key];
			}
		}
	}
	url += '&token=' + evbriteClient.anonymous_oauth;
	console.log(url);
	https.get(url, function (response){
		console.log("Status: ", response.statusCode);
		var body = "";
		response.on('data', function (chunk){
			body += chunk;
		});
		response.on('end', function(){
			res.json(JSON.parse(body));
		});
		response.on('error', function (e){
			console.error(e);
		});
	});
});

module.exports = router;