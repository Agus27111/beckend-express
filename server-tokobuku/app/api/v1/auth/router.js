const express = require('express');
const router = express.Router();
const authController = require('./controller')


router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/list', authController.getAll);

module.exports = router