const express = require('express');
const { 
    getActiveFlashSales, 
    getMonthlyBestSellers, 
    getNewArrivals,
    getAllProducts,
    getProductById,
    getProductsByCategory,



    deleteProduct,
    searchProducts,
    createProduct,
    updateProduct
} = require('../controllers/product');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET Products by Category ID
router.get('/category/:categoryId', AsyncHandler(getProductsByCategory));

// GET Active Flash Sale Products
router.get('/flash-sales', AsyncHandler(getActiveFlashSales));

// GET Monthly Best Sellers
router.get('/best-sellers', AsyncHandler(getMonthlyBestSellers));



// GET New Arrival Products
router.get('/new-arrivals', AsyncHandler(getNewArrivals));

// Search Products
router.get('/search', AsyncHandler(searchProducts));

// Public routes (no authentication required)
router.route('/')
    .get(AsyncHandler(getAllProducts));

router.route('/:id')
    .get(AsyncHandler(getProductById));

// Protected routes (require authentication)
router.route('/')
    .post(protect, authorize('admin'), AsyncHandler(createProduct));

router.route('/:id')
    .put(protect, authorize('admin'), AsyncHandler(updateProduct))
    .delete(protect, authorize('admin'), AsyncHandler(deleteProduct));

module.exports = router;