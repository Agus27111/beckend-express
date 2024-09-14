const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, 'postgres', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  
    dialect: process.env.DB_DIALECT, 
    logging: false, 
});


db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    db.sync({ alter: true, force: false });

    module.exports = db