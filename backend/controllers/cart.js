const Cart = require('../schemas/cart');

module.exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
            await cart.save();
        }

        return res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const existingItem = cart.products.find(item =>
            item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        cart.updatedAt = new Date();
        await cart.save();
        await cart.populate('products.product');

        return res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.products.find(item =>
            item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        item.quantity = quantity;
        cart.updatedAt = new Date();
        await cart.save();
        await cart.populate('products.product');

        return res.status(200).json({
            success: true,
            message: 'Cart item updated',
            data: cart
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.products = cart.products.filter(item =>
            item.product.toString() !== productId
        );

        cart.updatedAt = new Date();
        await cart.save();
        await cart.populate('products.product');

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: cart
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.products = [];
        cart.updatedAt = new Date();
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart cleared',
            data: cart
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};