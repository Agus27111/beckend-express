const Sequelize = require('sequelize');
const db = require('../../db');

const Book = require('../books/model');
const Category = require('../categories/model');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('admin', 'kasir'),
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    timestamps: true
});

module.exports = User;
