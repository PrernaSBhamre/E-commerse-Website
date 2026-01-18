const express = require('express');
const { 
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.route('/')
    .get(AsyncHandler(getAllCategories));

router.route('/:id')
    .get(AsyncHandler(getCategoryById));

// Protected routes (require authentication)
router.route('/')
    .post(protect, authorize('admin'), AsyncHandler(createCategory));

router.route('/:id')
    .put(protect, authorize('admin'), AsyncHandler(updateCategory))
    .delete(protect, authorize('admin'), AsyncHandler(deleteCategory));

module.exports = router;