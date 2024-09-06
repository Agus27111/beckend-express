const express = require('express');
const router = express.Router();
const { createCMSOrganizer,
    createCMSUser } = require('./controller');
// const {authenticateUser, authorizeRoles} = require('../../../middlewares/auth');

router.post('/organizers', createCMSOrganizer);
router.post('/users', createCMSUser);

module.exports = router;