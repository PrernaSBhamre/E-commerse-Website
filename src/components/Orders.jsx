import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#F9FAFB] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
                        <p className="text-sm text-gray-600">Check the status of recent orders and manage returns</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
                        {error}
                    </div>
                )}

                {orders.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
                        <div className="text-5xl mb-4">📦</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">You haven't placed any orders yet</h2>
                        <p className="text-gray-500 mb-6">All your order history will appear here once you start shopping!</p>
                        <Link to="/all-products" className="inline-block bg-red-600 text-white px-8 py-2 rounded-md font-bold hover:bg-red-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center text-sm">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Order Placed</p>
                                            <p className="text-gray-900 font-semibold">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Total</p>
                                            <p className="text-gray-900 font-semibold">{formatPrice(order.totalPrice)}</p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Ship To</p>
                                            <p className="text-gray-900 font-semibold">{order.shippingAddress?.name || 'Self'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">Order #</p>
                                        <p className="text-gray-900 font-mono text-[11px]">{order._id}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-6 py-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : order.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                        <h3 className="font-bold text-gray-900 capitalize text-sm">
                                            {order.status === 'pending' ? 'Preparing to ship' : order.status}
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        {order.products.map((item, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 flex-shrink-0 p-1">
                                                    <img 
                                                        src={item.product?.images?.[0] || item.product?.image || 'https://placehold.co/100x100?text=Product'} 
                                                        alt={item.product?.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Link to={`/product/${item.product?._id}`} className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors line-clamp-1">
                                                        {item.product?.name || 'Product'}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Actions */}
                                <div className="px-6 py-3 bg-white flex justify-end gap-4 text-xs">
                                    <button className="text-gray-600 hover:text-red-600 font-semibold border border-gray-200 px-4 py-1.5 rounded bg-gray-50">Track Shipment</button>
                                    <Link to={`/orders/${order._id}`} className="text-gray-600 hover:text-red-600 font-semibold border border-gray-200 px-4 py-1.5 rounded bg-gray-50">Order Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
