'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Itinerary = mongoose.model('Itinerary');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String
    },
    password: {
        type: String
    },
    itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" }],
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" }],
    oldItineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" }],
    preferences: {
        foods: {type: [String], default: []},
        events: {type: [String], default: []},
        nights: {type: [String], default: []}
    },
    baseLocation: String, //or could do lat-lon
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    foursquare: {
        id: String
    }
    // foursquareraw: {
    //     type: String
    // }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {
        user.salt = generateSalt();
        user.password = encryptPassword(user.password, user.salt);
    }

    next();

});

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});


mongoose.model('User', schema);