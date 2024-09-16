const Transactions = require('../transactions/model');
const DetailTransactions = require('../detailTransactions/model');
const Book = require('../books/model');
const Category = require('../categories/model');
const sequelize = require('../../db');
const { Op } = require('sequelize');

const checkout = async (req, res, next) => {
    const t = await sequelize.transaction(); 

    try {
        const { payload } = req.body;
        const { id } = req.user; 

        const detailPayload = [];
        const errorsPayload = [];

        // Iterasi untuk setiap item dalam payload
        for (const item of payload) {
            // Mengambil detail buku yang akan dibeli
            const book = await Book.findByPk(item.bookId);
            if (!book) {
                // Jika buku tidak ditemukan, catat ID buku dalam error array
                errorsPayload.push({ id: item.bookId, message: 'Book not found' });
                continue; // Lanjutkan ke item berikutnya
              }
        
              if (book.stock < item.quantity) {
                // Jika stok tidak mencukupi, catat ID buku dalam error array
                errorsPayload.push({ id: item.bookId, message: `Not enough stock. Available stock: ${book.stock}` });
                continue; // Lanjutkan ke item berikutnya
              }

            // Mengurangi stok buku dalam satu transaksi
            await book.decrement('stock', {
                by: item.quantity,
                transaction: t 
            });

            // Membuat transaksi untuk pengguna
            const transaction = await Transactions.create({
                userId: id,
                invoice: 'INV-' + Date.now(),
                date: new Date()
            }, { transaction: t }); 

            // Menambahkan detail transaksi ke array
            detailPayload.push({
                transactionId: transaction.id,
                bookId: item.bookId,
                titleBook: book.title,
                imageBook: book.image,
                priceBook: book.price,
                quantity: item.quantity,
                authorBook: book.author
            }); 
        }

        // Jika ada error, kirimkan respons dengan semua error yang terkumpul
    if (errorsPayload.length > 0) {
        await t.rollback();
        return res.status(400).json({
          status: "failed",
          message: errorsPayload.map(err => `Book with ID ${err.id}: ${err.message}`).join(', ')
        });
      }

        // Memasukkan detail transaksi ke database dalam satu transaksi
        await DetailTransactions.bulkCreate(detailPayload, { transaction: t });

        // Commit transaksi jika semua operasi berhasil
        await t.commit();

        // Mengirim respons yang berisi detail transaksi yang telah di-checkout
        res.status(201).json({
            status: 'success',
            message: 'Checkout success',
            data: detailPayload
        });

    } catch (error) {
        // Rollback semua perubahan jika terjadi error
        await t.rollback();
        next(error); // Mengirim error ke middleware error handler
    }
};







module.exports = { checkout };
