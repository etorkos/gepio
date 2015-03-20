'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/restaurants', require('./restaurants'));

router.use('/user', require('./user'));
