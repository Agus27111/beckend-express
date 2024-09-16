const Sequelize = require('sequelize');
const db = require('../../db');

const DetailTransactions = db.define('detailTransactions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transactionId: {  
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    bookId: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'books', 
            key: 'id'
        }
    },
    titleBook: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorBook: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    imageBook: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priceBook: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = DetailTransactions;
