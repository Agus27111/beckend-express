const express = require('express');
const router = express.Router();
const {getAllBooks} = require('./controller')
const authMiddleware = require('../middleware/auth')

router.get('/books',authMiddleware,  getAllBooks);
// router.post('/categories', authMiddleware, createCategories);
// router.put('/categories/:id', authMiddleware, updateCategories);
// router.delete('/categories/:id', authMiddleware, deleteCategories);

module.exports = router