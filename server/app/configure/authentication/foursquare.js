'use strict';
var path = require('path');
var passport = require('passport');
var FoursquareStrategy = require('passport-foursquare').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {
    var foursquareCredentials = {
        clientID: "KPQ0DMWKCFGFUBOIMMRK1Q1USDQ5XRVP32D1QGQAXUEMJAOP",
        clientSecret: "RCHKZFPZUFPNS1KQVCJWUEEOFRLC2FA0OZFX0MB4ZKG4OSCE",
        callbackURL: "http://localhost:1337/auth/foursquare/callback"
    };

	var profileg;
    var verifyCallback = function (accessToken, refreshToken, profile, done) {
    	// console.log(profile);
    	profileg = profile
        UserModel.findOne({ 'foursquare.id': profile.id }, function (err, user) {

            if (err) return done(err);

            if (user) {
            	user.foursquareraw = profile._raw;
            	user.save(function(){
	                done(null, user);
            	})
            } else {
            	var object_to_be_saved = {
            		foursquare: {
            			id: profile.id
            		},
            		firstName: profile.name.givenName,
            		lastName: profile.name.familyName,
            		email: profile.emails[0].value,
            		foursquareraw : profile._raw
            	};
                UserModel.create(object_to_be_saved).then(function (user) {
                    done(null, user);
                });
            }

        });

    };

    passport.use(new FoursquareStrategy(foursquareCredentials, verifyCallback));

    app.get('/auth/foursquare', passport.authenticate('foursquare'));

    app.get('/auth/foursquare/callback',
        passport.authenticate('foursquare', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/user');
    });

};

