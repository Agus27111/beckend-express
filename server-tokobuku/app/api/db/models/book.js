'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category, {
        foreignKey: 'category'
      });
      Book.belongsTo(models.User, {
        foreignKey: 'user'
      });

    }
  }
  Book.init({
    category: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.TEXT,
    published: DataTypes.DATE,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Book' // Pastikan nama tabel sesuai
  });
  return Book;
};
