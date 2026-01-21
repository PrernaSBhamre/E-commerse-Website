const Order = require('../schemas/order');
const Product = require('../schemas/product');
const { updateSalesCount } = require('./product');

// Create new order
module.exports.createOrder = async (req, res) => {
    try {
        const { products, totalPrice, shippingAddress } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        // Create new order
        const order = await Order.create({
            user: userId,
            products,
            totalPrice,
            shippingAddress
        });

        // Update sales count for each product in the order
        await updateSalesCount(order);

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while creating order'
        });
    }
};

// Update order status (e.g., when payment is confirmed)
module.exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, paymentstatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { 
                ...(status && { status }),
                ...(paymentstatus && { paymentstatus })
            },
            { new: true }
        ).populate('user').populate('products.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // If payment status is updated to 'paid', update sales counts
        if (paymentstatus === 'paid') {
            await updateSalesCount(order);
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while updating order status'
        });
    }
};

// Get user's orders
module.exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated

        const orders = await Order.find({ user: userId })
            .populate('products.product')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server error while fetching orders'
        });
    }
};