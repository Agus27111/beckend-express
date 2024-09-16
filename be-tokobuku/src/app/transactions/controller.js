const DetailTransactions = require('../detailTransactions/model');
const TransactionsModel = require('./model');
const { Op } = require('sequelize');

const getAllTransactions = async (req, res, next) => {
        try {
            const {keywords = ''} = req.query;
           
            let condition = {
                userId: req.user.id
            }
    
            if(keywords !== '') {
                condition = {
                    ...condition,
                    invoice: {
                        [Op.like]: `%${keywords}%`
                        
                    }
                }
            }
            
            const transaction = await TransactionsModel.findAll({where: condition, include: {
                model: DetailTransactions,
            } });
            res.status(201).json({
                message: 'Get transaction successful',
                data: transaction
            })        
        } catch (error) {
            next(error)
        }
    }
const detailTransactions = async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const detailTransaction = await TransactionsModel.findAll({where: {id: id}, include: {
                model: DetailTransactions,
            } });
            res.status(201).json({
                message: 'Get detail transaction successful',
                data: detailTransaction
            })        
        } catch (error) {
            next(error)
        }
    }

    module.exports = {
        getAllTransactions,
        detailTransactions
    }