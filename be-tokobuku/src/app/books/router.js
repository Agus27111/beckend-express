const express = require('express');
const  router = express.Router();

const AuthMiddleware = require('../../middleware/auth')

const { getAllBooks, createBook, updateBook, deleteBook, bookByTitle } = require('./controller');

router.get('/books',AuthMiddleware, getAllBooks);
router.post('/books',AuthMiddleware, createBook);
router.put('/books/:id',AuthMiddleware, updateBook);
router.delete('/books/:id',AuthMiddleware, deleteBook);
router.get('/books/:title',AuthMiddleware, bookByTitle);


module.exports = router