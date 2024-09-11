'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.bulkInsert('Book', [{
      id: 1,
      category: 101,  // ID kategori
      user: 1,  // ID user yang terkait
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://example.com/images/great-gatsby.jpg",
      published: new Date('1925-04-10'),
      price: 150000, 
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      category: 102,
      user: 2,
      title: "1984",
      author: "George Orwell",
      image: "https://example.com/images/1984.jpg",
      published: new Date('1949-06-08'),
      price: 120000,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      category: 103,
      user: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://example.com/images/to-kill-a-mockingbird.jpg",
      published: new Date('1960-07-11'),
      price: 135000,
      stock: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      category: 101,
      user: 3,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      image: "https://example.com/images/catcher-in-the-rye.jpg",
      published: new Date('1951-07-16'),
      price: 160000,
      stock: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
   
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Book', null, {});
    
  }
};
