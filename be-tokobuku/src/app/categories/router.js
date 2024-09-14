const express = require('express');
const  router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('./controller');
const AuthMiddleware = require('../../middleware/auth')

router.get('/categories',AuthMiddleware, getCategories);
router.post('/categories', AuthMiddleware, createCategory);
router.put('/categories/:id', AuthMiddleware, updateCategory);
router.delete('/categories/:id', AuthMiddleware, deleteCategory);

module.exports = router