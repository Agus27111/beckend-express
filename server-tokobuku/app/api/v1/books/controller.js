const { query } = require('express')
const {Book} = require('../../db/models')
const {op} = require('sequelize')

module.exports = {
    getAllBooks: async (req, res, next) => {
        try {
            const {keyword} = req.query
            console.log("🚀 ~ getAllBooks: ~ keyword:", keyword)

            let conditions = {
                user: req.user.id
            }

            if(keyword !== ''){
                conditions = {...conditions, title: {[Op.like]: `%${keyword}%`}}
            }
            
            const books = await Book.findAll({
                where: condition,
                include: category,
                attributes: ["id", "name"],
            })
        
            res.status(201).json(books)
            
        } catch (error) {
            next(error)
        }
    },

    createBooks : async (req, res, next) => {
        try {
            const {name} = req.body;
            const userId = req.user.id

            if(!userId) throw new Error ('User not found')

            const newCategories = await Categories.create({
                name: name,
                user: userId
            })         
            
            res.status(201).json({
                message: 'Succes get All books',
                data: newCategories
            })
        } catch (error) {
            next(error)
        }
    },

    // updateCategories : async(req, res, next) => {
    //     try {
    //         const {id} = req.params;
    //         const {name} = req.body;

    //         const findCategories = await Categories.findOne({where: {id: id, user: req.user.id}})

    //         if (!findCategories){
    //             throw new Error ('catgories didnt match to anything')
    //         } else {
    //             const updateCategories = await findCategories.update({name: name})

    //             res.status(200).json({
    //                 message: 'Category updated',
    //                 data: updateCategories
    //             })
    //         }
            
    //     } catch (error) {
    //         next(error)
    //     }
    // },

    // deleteCategories : (req, res, next) => {
    //     Categories.findOne({where: {id: req.params.id, user: req.user.id}})
    //     .then((categories) => {
    //         if(categories) {
    //             categories.destroy()
    //             res.status(200).json({
    //                 message: 'Category deleted',
    //                 data: categories
    //             })
    //         } else {
    //             throw new Error('Category not found')
    //         }
    //     })
    //     .catch(error => next(error))
    // }

}