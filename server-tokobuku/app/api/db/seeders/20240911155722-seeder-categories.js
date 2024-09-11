'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.bulkInsert('Categories', [{
      id: 1,
      user: 1, // ID user terkait
      name: "Toko Buku Sejahtera",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      user: 2,
      name: "Pustaka Nusantara",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      user: 1,
      name: "Buku Pintar Indonesia",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      user: 2,
      name: "Gramedia Online",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
   
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
