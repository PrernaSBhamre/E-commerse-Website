const Product = require('../schemas/product');
const Order = require('../schemas/order');
const Category = require('../schemas/category');
const mongoose = require('mongoose');

// Get active flash sale products
module.exports.getActiveFlashSales = async (req, res) => {
    try {
        const now = new Date();
        
        const flashSaleProducts = await Product.find({
            'flashSale.isActive': true,
            'flashSale.endTime': { $gt: now }
        })
        .populate('category')
        .select('-__v');
        
        res.status(200).json({
            success: true,
            count: flashSaleProducts.length,
            data: flashSaleProducts
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching flash sale products'
        });
    }
};

// Get this month's best sellers
module.exports.getMonthlyBestSellers = async (req, res) => {
    try {
        // Get top selling products based on salesCount field
        const bestSellerProducts = await Product.find({})
            .populate('category')
            .select('-__v')
            .sort({ salesCount: -1 }) // Sort by salesCount in descending order
            .limit(10); // Top 10 best sellers
        
        res.status(200).json({
            success: true,
            count: bestSellerProducts.length,
            data: bestSellerProducts
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching best sellers'
        });
    }
};

// Get new arrival products
module.exports.getNewArrivals = async (req, res) => {
    try {
        const newArrivalProducts = await Product.find({})
            .populate('category')
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .limit(10) // Limit to last 10 products
            .select('-__v');
        
        res.status(200).json({
            success: true,
            count: newArrivalProducts.length,
            data: newArrivalProducts
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching new arrivals'
        });
    }
};

// Helper function to update sales count when an order is placed
module.exports.updateSalesCount = async (order) => {
    try {
        for (const item of order.products) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { salesCount: item.quantity } },
                { new: true }
            );
        }
    } catch (error) {

    }
};

// Get all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .select('-__v')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching products'
        });
    }
};

// Get products by category ID
module.exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        
        // Validate if categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID format'
            });
        }
        
        const products = await Product.find({ category: categoryId })
            .populate('category')
            .select('-__v')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: products.length,
            categoryId: categoryId,
            data: products
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching products by category'
        });
    }
};

// Get single product by ID
module.exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category')
            .select('-__v');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching product'
        });
    }
};

// Create new product
module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, stock, flashSale } = req.body;
        
        const product = await Product.create({
            name,
            description,
            price,
            category,
            images: images || [],
            stock,
            flashSale: flashSale || {
                isActive: false,
                discountPercentage: 0,
                endTime: null,
                originalPrice: price
            }
        });
        
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while creating product'
        });
    }
};

// Update product
module.exports.updateProduct = async (req, res) => {
    try {
        const allowedUpdates = ['name', 'description', 'price', 'category', 'images', 'stock', 'flashSale'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: 'Invalid updates!'
            });
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('category');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while updating product'
        });
    }
};

// Delete product
module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while deleting product'
        });
    }
};

// Search products
module.exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        // Create regex for case-insensitive search
        const regex = new RegExp(q, 'i');

        const products = await Product.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { 'category.name': { $regex: regex } } // Assuming you might want to search categories too, but requires lookups if category is ObjectId. For now, simple fields.
            ]
        })
        .populate('category')
        .select('-__v');

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during search'
        });
    }
};