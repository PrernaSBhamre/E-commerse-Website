const Review = require('../schemas/review');
const Product = require('../schemas/product');

// Calculate and update product ratings
const updateProductRatings = async (productId) => {
    try {
        // Get all reviews for this product
        const reviews = await Review.find({ product: productId });
        
        if (reviews.length === 0) {
            // No reviews, reset ratings
            await Product.findByIdAndUpdate(productId, {
                averageRating: 0,
                totalReviews: 0
            });
            return;
        }
        
        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        
        // Update product with new ratings
        await Product.findByIdAndUpdate(productId, {
            averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            totalReviews: reviews.length
        });
        

    } catch (error) {

    }
};

// Calculate discount information for frontend display
const calculateDiscountInfo = (product) => {
    const now = new Date();
    let discountInfo = {
        isActive: false,
        percentage: 0,
        amount: product.price,
        savings: 0,
        endTime: null
    };
    
    // Check flash sale
    if (product.flashSale && product.flashSale.isActive) {
        const flashEndTime = new Date(product.flashSale.endTime);
        if (flashEndTime > now) {
            discountInfo = {
                isActive: true,
                percentage: product.flashSale.discountPercentage,
                amount: product.price - (product.price * product.flashSale.discountPercentage / 100),
                savings: product.price * product.flashSale.discountPercentage / 100,
                endTime: flashEndTime
            };
        }
    }
    
    return discountInfo;
};

// Update discount info for a product
const updateProductDiscountInfo = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) return;
        
        const discountInfo = calculateDiscountInfo(product);
        
        await Product.findByIdAndUpdate(productId, {
            discountInfo: discountInfo
        });
        

    } catch (error) {

    }
};

// Update all product ratings and discounts (for scheduled jobs)
const updateAllProductsInfo = async () => {
    try {
        const products = await Product.find({});
        
        for (const product of products) {
            await updateProductRatings(product._id);
            await updateProductDiscountInfo(product._id);
        }
        

    } catch (error) {

    }
};

module.exports = {
    updateProductRatings,
    calculateDiscountInfo,
    updateProductDiscountInfo,
    updateAllProductsInfo
};