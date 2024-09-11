'use strict';

/ @type {import('sequelize-cli').Migration} /
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Transactions', [ {
        id: 1,
        user: 1, 
        invoice: "INV-20230911-001",
        date: new Date('2023-09-11'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user: 2, 
        invoice: "INV-20230911-002",
        date: new Date('2023-09-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('Transactions', null, {});
    
  }
};
