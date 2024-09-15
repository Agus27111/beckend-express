const BookModel = require('./model');
const CategoryModel = require('../categories/model');
const { Op } = require('sequelize');

const getAllBooks = async (req, res, next) => {
    try {
        const {keywords = ''} = req.query;
       
        let condition = {
            userId: req.user.id
        }

        if(keywords !== '') {
            condition = {
                ...condition,
                title: {
                    [Op.like]: `%${keywords}%`
                }
            }
        }
        
        const books = await BookModel.findAll({where: condition, include: {
            model: CategoryModel,
            as: 'category',
        } });
        res.status(201).json({
            message: 'Get books successful',
            data: books
        })        
    } catch (error) {
        next(error)
    }
}

const createBook = async (req, res, next) => {
    try {
        const { title, author, image, publishedDate, price, stock, categoryId } = req.body;
        const userId = req.user.id; 

        const checkCategory = await CategoryModel.findOne({ where: { id: categoryId, userId: userId } });
        
        if (!checkCategory) {
            return res.status(401).json({ message: 'Id category not found' });
        }
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to create books.' });
        }

        const book = await BookModel.create({
            title,
            author,
            image,
            publishedDate,
            price,
            stock,
            categoryId, 
            userId     
        });

        res.status(201).json({
            message: 'Book created successfully',
            data: book
        });
    } catch (error) {
        next(error);
    }
};
const updateBook = async (req, res, next) => {
    try {
        console.log('Before fetching book');
        const { id } = req.params;
        const { title, author, image, publishedDate, price, stock, categoryId } = req.body;
        const userId = req.user.id;

        const bookId = await BookModel.findOne({ where: { id: id } });
        
        if (!bookId) {

            return res.status(404).json({ message: 'Book not found' });
        }

        const checkCategory = await CategoryModel.findOne({ where: { id: categoryId, userId: userId } });
       
        if (!checkCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update books.' });
        }

        await bookId.update({
            title,
            author,
            image,
            publishedDate,
            price,
            stock,
            categoryId, 
        });

        res.status(200).json({
            message: 'Book updated successfully',
            data: bookId
        });
    } catch (error) {
        next(error);
    }
};



const deleteBook = async (req, res, next) => {
    try {
        const userId = req.user.id;  
        const { id } = req.params;  

        const book = await BookModel.findOne({ where: { id: id, userId: userId } });
        console.log("🚀 ~ deleteBook ~ book:", book)

        if (!book) {
            return res.status(404).json({ message: 'Book not found or you are not authorized' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete books.' });
        }
        
        await book.destroy();

        res.status(200).json({
            message: 'Delete book successful',
            data: book
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
   
}