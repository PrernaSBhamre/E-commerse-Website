const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cart');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user's cart
router.get('/', AsyncHandler(getCart));

// Add item to cart
router.post('/add', AsyncHandler(addToCart));

// Update cart item quantity
router.put('/update/:productId', AsyncHandler(updateCartItem));

// Remove item from cart
router.delete('/remove/:productId', AsyncHandler(removeFromCart));

// Clear entire cart
router.delete('/clear', AsyncHandler(clearCart));

module.exports = router;