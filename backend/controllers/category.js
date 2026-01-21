const Category = require('../schemas/category');

// Get all categories
module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .select('-__v')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching categories'
        });
    }
};

// Get single category by ID
module.exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .select('-__v');
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching category'
        });
    }
};

// Create new category
module.exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const category = await Category.create({
            name,
            description
        });
        
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while creating category'
        });
    }
};

// Update category
module.exports.updateCategory = async (req, res) => {
    try {
        const allowedUpdates = ['name', 'description'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: 'Invalid updates!'
            });
        }
        
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while updating category'
        });
    }
};

// Delete category
module.exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while deleting category'
        });
    }
};