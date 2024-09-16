const express = require('express');
const  router = express.Router();

const AuthMiddleware = require('../../middleware/auth')

const { getAllBooks, createBook, updateBook, deleteBook } = require('./controller');

router.get('/books',AuthMiddleware, getAllBooks);
router.post('/books',AuthMiddleware, createBook);
router.put('/books/:id',AuthMiddleware, updateBook);
router.delete('/books/:id',AuthMiddleware, deleteBook);


module.exports = router