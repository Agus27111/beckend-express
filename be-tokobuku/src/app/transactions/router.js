const express = require('express')
const router = express.Router()

const AuthMiddleware = require('../../middleware/auth')

const { getAllTransactions, detailTransactions } = require('./controller')

router.get('/transactions', AuthMiddleware, getAllTransactions)
router.get('/transactions/:id', AuthMiddleware, detailTransactions )

module.exports = router