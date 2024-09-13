const express = require('express');
const router = express.Router();
const {getAllCategories, createCategories, updateCategories, deleteCategories} = require('./controller')
const authMiddleware = require('../middleware/auth')

router.get('/categories', authMiddleware, getAllCategories);
router.post('/categories', authMiddleware, createCategories);
router.put('/categories/:id', authMiddleware, updateCategories);
router.delete('/categories/:id', authMiddleware, deleteCategories);

module.exports = router