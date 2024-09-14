const Sequelize = require('sequelize');
const db = require('../../db');

const User = db.define('users', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING
    },
    role:{
        type: Sequelize.STRING,
        attribute: ['admin', 'kasir']
    }
});

module.exports = User;