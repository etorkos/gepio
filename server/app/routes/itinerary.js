'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');

router.post('/', function(req, res, next){
	console.log('Got to itinerary post');
	var user = req.body.user || 'tempUser' ; //want name as a string
	var title = req.body.title;

	Itinerary.create({users: [user], title: title}, function(err, data){
		if (err) console.log(err);
		res.send(data);
	});
	
});

module.exports = router;