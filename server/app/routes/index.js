'use strict';
var router = require('express').Router();
var yelp = require('yelp');
module.exports = router;

router.use('/tutorial', require('./tutorial'));

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