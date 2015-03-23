'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));

router.use('/venues', require('./venues'));

router.use('/events', require('./events'));

router.use('/movies', require('./movies'));

router.use('/chatroom', require('./chatroom'));
