const Sequelize = require('sequelize');
const db = require('../../db');

const Transactions = db.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    invoice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Transactions;