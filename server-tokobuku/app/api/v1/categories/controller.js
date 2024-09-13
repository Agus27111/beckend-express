const {Categories} = require('../../db/models')


module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Categories.findAll({
                where: {user: req.user.id}, 
                attributes: ['id','user', 'name'],
            })
        
            res.status(200).json(categories)
            
        } catch (error) {
            next(error)
        }
    }, 

    createCategories : async (req, res, next) => {
        try {
            const {name} = req.body;
            const userId = req.user.id

            if(!userId) throw new Error ('User not found')

            const newCategories = await Categories.create({
                name: name,
                user: userId
            })         
            
            res.status(201).json({
                message: 'Category created',
                data: newCategories
            })
        } catch (error) {
            next(error)
        }
    },

    updateCategories : async(req, res, next) => {
        try {
            const {id} = req.params;
            const {name} = req.body;

            const findCategories = await Categories.findOne({where: {id: id, user: req.user.id}})

            if (!findCategories){
                throw new Error ('catgories didnt match to anything')
            } else {
                const updateCategories = await findCategories.update({name: name})

                res.status(200).json({
                    message: 'Category updated',
                    data: updateCategories
                })
            }
            
        } catch (error) {
            next(error)
        }
    },

    deleteCategories : (req, res, next) => {
        Categories.findOne({where: {id: req.params.id, user: req.user.id}})
        .then((categories) => {
            if(categories) {
                categories.destroy()
                res.status(200).json({
                    message: 'Category deleted',
                    data: categories
                })
            } else {
                throw new Error('Category not found')
            }
        })
        .catch(error => next(error))
    }

}