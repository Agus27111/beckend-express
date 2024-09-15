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
        
        if (!userId) {
            return res.status(401).json({ message: 'Please log in first.' });
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
        const { id } = req.params;
        const { name } = req.body;

        const books = await BookModel.findOne({ where: { id, userId: req.user.id } });

        if(!books) throw new Error ('books not found')

        const updatebooks = await books.update({ name });

        res.status(200).json({
            message: 'Update books successful',
            data: updatebooks
        });
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const booksById = await BookModel.findOne({ where: { id, userId: req.user.id } });

        if(!booksById) throw new Error ('books not found')

        const books = await booksById.destroy();
        
        res.status(200).json({
            message: 'Delete books successful',
            data: books
        });
    } catch (error) {
        next(error)
    }
}

const bookByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;   

        const books = await BookModel.findAll({ where: { title: title } });

        res.status(200).json({
            message: 'Get books by title successful',
            data: books
        });
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    bookByTitle
}