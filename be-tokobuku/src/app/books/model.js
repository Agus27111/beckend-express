const Sequelize = require('sequelize');
const db = require('../../db');

const Book = db.define('books', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryId: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', 
            key: 'id' 
        }
    },
    userId: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publishedDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Book;