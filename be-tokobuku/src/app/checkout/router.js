const express = require('express');
const  router = express.Router();
const AuthMiddleware = require('../../middleware/auth')
const { checkout } = require('./controller');


router.post('/checkouts',AuthMiddleware, checkout);

module.exports = router