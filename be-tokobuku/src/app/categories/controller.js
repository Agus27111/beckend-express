const CategoryModel = require('./model');

const getCategories = async (req, res, next) => {
    try {

        const categories = await CategoryModel.findAll(
            {where:{
                userId: req.user.id
            }
            });

        res.status(200).json({
            message: 'Get categories successful',
            data: categories
        });
    } catch (error) {
        next(error)
    }
}
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id

        if(!userId) throw new Error ('loggin first')
        const category = await CategoryModel.create({ name:name, userId: userId });
        res.status(201).json({
            message: 'Create category successful',
            data: category
        });
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await CategoryModel.findOne({ where: { id, userId: req.user.id } });

        if(!category) throw new Error ('category not found')

        const updateCategory = await category.update({ name });

        res.status(200).json({
            message: 'Update category successful',
            data: updateCategory
        });
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoryById = await CategoryModel.findOne({ where: { id, userId: req.user.id } });

        if(!categoryById) throw new Error ('category not found')

        const category = await categoryById.destroy();
        
        res.status(200).json({
            message: 'Delete category successful',
            data: category
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}