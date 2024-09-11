'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('rahasia', 10)
      await queryInterface.bulkInsert('Users', [ {
        id: 1,
        name: "admin1",
        email: "admin@example.com",
        password: hashPassword, 
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "kasir1",
        email: "kasir@example.com",
        password: hashPassword, 
        role: "kasir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },], {});
 
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
   
  }
};
