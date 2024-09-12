const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

router.get('/categories', authMiddleware, (req, res)=> {
    res.status(200).json({data: 'categories'})
})

module.exports = router