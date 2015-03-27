'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');
var User = mongoose.model('User');

router.post('/', function(req, res, next){
	console.log('Got to itinerary post with', req.body.user);
	var user = req.body.user._id || 'tempUser' ; //want name as a string
	var title = req.body.title;
	Itinerary.create({users: [user], title: title}, function(err, data){
		if (err) res.status(500).send(err)
		else if(user === 'tempUser'){
			console.log('temp user')
			res.status(200).send(data);
		}
		else {
			User.findOneAndUpdate( {'_id': user}, { $push: { itineraries: data._id }}, function(err, user){
				if(err) res.status(500).send(err);
				console.log('enduser', user);
				res.status(200).send(data);
			});
		}
	});
	
});

module.exports = router;