const Wishlist = require('../schemas/wishlist');

module.exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ user: userId }).populate('products');

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
            await wishlist.save();
        }

        return res.status(200).json({
            success: true,
            data: wishlist
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        // Check if product already exists in wishlist
        const exists = wishlist.products.some(id => id.toString() === productId);

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Product already in wishlist'
            });
        }

        wishlist.products.push(productId);
        wishlist.updatedAt = new Date();
        await wishlist.save();
        await wishlist.populate('products');

        return res.status(200).json({
            success: true,
            message: 'Product added to wishlist',
            data: wishlist
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found'
            });
        }

        wishlist.products = wishlist.products.filter(id =>
            id.toString() !== productId
        );

        wishlist.updatedAt = new Date();
        await wishlist.save();
        await wishlist.populate('products');

        return res.status(200).json({
            success: true,
            message: 'Product removed from wishlist',
            data: wishlist
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};