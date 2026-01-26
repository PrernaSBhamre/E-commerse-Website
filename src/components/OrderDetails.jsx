import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        // Using existing getUserOrders endpoint for frontend-only filtering
        const response = await api.get('/orders');
        if (response.data.success) {
          const foundOrder = response.data.data.find(o => o._id === orderId);
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            setError('Order not found.');
          }
        }
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="min-h-screen bg-[#F9FAFB] py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center bg-white p-12 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{error || 'Order Details Unavailable'}</h2>
          <Link to="/orders" className="text-red-600 font-semibold hover:underline mt-4 inline-block">Back to My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <Link to="/orders" className="hover:text-red-600 transition-colors uppercase font-bold tracking-wider">My Orders</Link>
          <span>/</span>
          <span className="uppercase font-bold tracking-wider text-gray-900">Order ID: {order._id}</span>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-600">Ordered on {formatDate(order.createdAt)} | Order# {order._id}</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">Invoice</button>
             <Link to="/all-products" className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm">Buy Again</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2 uppercase tracking-wider">Shipping Address</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-bold">{order.shippingAddress?.fullName || 'John Doe'}</p>
              <p>{order.shippingAddress?.addressLine1 || '123 Street Address'}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.phone || '+91 00000 00000'}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2 uppercase tracking-wider">Payment Status</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${order.paymentstatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <p className="capitalize font-semibold">{order.paymentstatus}</p>
              </div>
              <p className="text-xs text-gray-500 italic">Method: Online Payment</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2 uppercase tracking-wider">Order Summary</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-100 pt-2 text-base">
                <span>Order Total:</span>
                <span className="text-red-600">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Shipment Details</h2>
           </div>
           <div className="p-6 divide-y divide-gray-100">
              {order.products.map((item, idx) => (
                <div key={idx} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 bg-gray-50 rounded border border-gray-100 flex-shrink-0 p-2">
                        <img 
                            src={item.product?.images?.[0] || item.product?.image || 'https://placehold.co/100x100?text=Product'} 
                            alt={item.product?.name} 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <Link to={`/product/${item.product?._id}`} className="text-base font-bold text-gray-900 hover:text-red-600 transition-colors">
                            {item.product?.name || 'Product'}
                        </Link>
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xl">{item.product?.description || 'No description available for this item.'}</p>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                            <span className="text-red-600">Price: {formatPrice(item.price)}</span>
                            <span className="text-gray-400">|</span>
                            <span>Qty: {item.quantity}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[150px]">
                        <button className="w-full bg-red-600 text-white text-[11px] font-bold py-2 rounded hover:bg-red-700 transition-colors">Write a product review</button>
                        <button className="w-full bg-white border border-gray-300 text-gray-700 text-[11px] font-bold py-2 rounded hover:bg-gray-50 transition-colors">Archive Order</button>
                    </div>
                </div>
              ))}
           </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
            <Link to="/orders" className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                View all orders
            </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
