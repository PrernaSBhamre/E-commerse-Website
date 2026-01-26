const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlist');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

// Get user's wishlist
router.get('/', AsyncHandler(getWishlist));

// Add item to wishlist
router.post('/add/:productId', AsyncHandler(addToWishlist));

// Remove item from wishlist
router.delete('/remove/:productId', AsyncHandler(removeFromWishlist));

module.exports = router;