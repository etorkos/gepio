'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/venues', require('./venues'));
router.use('/events', require('./events'));
router.use('/movies', require('./movies'));