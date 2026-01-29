const Review = require('../schemas/review');
const Product = require('../schemas/product');
const { updateProductRatings } = require('../utils/productHelpers');

// Create new review
module.exports.createReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: userId,
            product: product
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            });
        }

        // Create new review
        let review = await Review.create({
            user: userId,
            product,
            rating,
            comment
        });

        // Populate user name for immediate display in frontend
        review = await review.populate('user', 'name');

        // Update product ratings
        await updateProductRatings(product);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while creating review'
        });
    }
};

// Get all reviews for a product
module.exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching reviews'
        });
    }
};

// Update review
module.exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        const review = await Review.findOneAndUpdate(
            { _id: reviewId, user: userId },
            { rating, comment },
            { new: true }
        ).populate('user', 'name');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        // Update product ratings
        await updateProductRatings(review.product);

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while updating review'
        });
    }
};

// Delete review
module.exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({
            _id: reviewId,
            user: userId
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        // Update product ratings
        await updateProductRatings(review.product);

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while deleting review'
        });
    }
};