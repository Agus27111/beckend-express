const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//route
const categoriesRouter = require('./app/api/v1/categories/router');
const authRouter = require('./app/api/v1/auth/router');
const booksRouter = require('./app/api/v1/books/router');

const app = express();
const URL = '/api/v1'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Tokobuku'})
});

app.use(`${URL}/auth`, categoriesRouter);
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/auth`, booksRouter);

module.exports = app;
