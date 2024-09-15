const Book = require('../app/books/model');
const Category = require('../app/categories/model');
const User = require('../app/users/model');

// Setup associations
Category.hasMany(Book, { foreignKey: 'categoryId', as: 'category' });
Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });


User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

console.log("Database association established");

module.exports = { Book, Category, User };
