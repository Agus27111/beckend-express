'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
  
      await queryInterface.bulkInsert('DetailTransactions', [{
        id: 1,
        transaction: 1, // Referensi ke transaction dengan ID 1 ('INV-20230911-001')
        book: 1, // Referensi ke buku dengan ID 1 ('The Great Gatsby')
        titleBook: "The Great Gatsby",
        authorBook: "F. Scott Fitzgerald",
        imageBook: "https://example.com/images/great-gatsby.jpg",
        priceBook: 150000, // Harga buku dalam rupiah
        quantity: 2, // Jumlah buku yang dibeli
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        transaction: 2, // Referensi ke transaction dengan ID 2 ('INV-20230911-002')
        book: 2, // Referensi ke buku dengan ID 2 ('1984')
        titleBook: "1984",
        authorBook: "George Orwell",
        imageBook: "https://example.com/images/1984.jpg",
        priceBook: 120000,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },], {});
   
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.bulkDelete('DetailTransactions', null, {});
     
  }
};
