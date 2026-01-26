import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const discount = 0; // Mock discount for now
    const deliveryCharges = 0; // Free delivery
    const totalAmount = cartTotal - discount + deliveryCharges;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 px-4">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329061.png" 
                    alt="Empty Cart" 
                    className="w-48 h-48 mb-8 opacity-20 grayscale"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Shopping Cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-sm">Give it some love! Add items to your cart and they will appear here.</p>
                <Link to="/all-products" className="bg-[#DB4444] text-white px-12 py-4 rounded-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F1F3F6] min-h-screen pb-20 pt-28">
            <div className="container mx-auto px-4 lg:px-20 max-w-7xl">
                
                {/* Desktop Grid Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Section: Cart Items (Amazon/Myntra style) */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        
                        {/* Header Box */}
                        <div className="bg-white p-5 rounded-sm shadow-sm flex items-center justify-between border-b border-gray-100">
                            <h1 className="text-lg font-bold text-gray-800">My Cart ({cartItems.length})</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Deliver to: <span className="font-bold text-black italic">Select Address</span></span>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="bg-white rounded-sm shadow-sm overflow-hidden min-h-[400px]">
                            {cartItems.map((item, index) => (
                                <div key={item._id} className={`p-6 flex flex-col md:flex-row gap-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors relative group`}>
                                    
                                    {/* Circular Remove Icon - Top Left corner */}
                                    <button 
                                        onClick={() => removeFromCart(item._id)}
                                        className="absolute -top-2 -left-2 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-400 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90 z-10"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    
                                    {/* Product Image Section */}
                                    <div className="flex flex-col items-center gap-4">
                                        <Link to={`/product/${item._id}`} className="w-32 h-32 flex items-center justify-center p-2 border border-gray-100 rounded-sm">
                                            <img 
                                                src={item.images?.[0] || item.image} 
                                                alt={item.name} 
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </Link>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-gray-300 rounded-full h-8 w-24 overflow-hidden bg-white">
                                            <button 
                                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                className="flex-1 h-full hover:bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500"
                                            >−</button>
                                            <span className="w-8 text-center text-sm font-bold text-gray-800 tabular-nums">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="flex-1 h-full hover:bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500"
                                            >+</button>
                                        </div>
                                    </div>

                                    {/* Product Details Section */}
                                    <div className="flex-1 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <Link to={`/product/${item._id}`} className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <div className="text-right whitespace-nowrap">
                                                <div className="text-xl font-bold text-black">₹{item.price * item.quantity}</div>
                                                <div className="text-xs text-gray-400 font-medium">(₹{item.price} / item)</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs py-1 px-2 bg-gray-100 text-gray-600 rounded-sm font-bold uppercase tracking-wider">
                                                {item.category?.name || 'In Stock'}
                                            </span>
                                        </div>

                                        <div className="mt-auto flex items-center gap-6 pt-6">
                                            <button 
                                                className="text-[11px] font-black text-gray-500 hover:text-black transition-all flex items-center gap-2 uppercase tracking-widest"
                                            >
                                                SAVE FOR LATER
                                            </button>
                                            <button 
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-[11px] font-black text-gray-500 hover:text-red-600 transition-all flex items-center gap-2 uppercase tracking-widest border border-gray-200 px-4 py-1.5 rounded-sm bg-white hover:border-red-600"
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delivery Info Mockup */}
                                    <div className="hidden lg:block w-48 text-sm pt-2">
                                        <div className="text-gray-500 mb-1 flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Delivery by <span className="font-bold text-black">Sat, Jan 31</span>
                                        </div>
                                        <div className="text-gray-400 text-xs">Free Delivery <span className="line-through">₹40</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Confirmation Mock Footer */}
                        <div className="bg-white p-5 rounded-sm shadow-sm flex justify-end sticky bottom-0 z-30 border-t border-gray-100">
                             <button 
                                onClick={() => navigate(`/checkout/${cartItems[0]._id}`)}
                                className="bg-[#FB641B] text-white px-16 py-4 rounded-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wider"
                             >
                                Place Order
                             </button>
                        </div>
                    </div>

                    {/* Right Section: Price Details (Amazon/Flipkart sidebar style) */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4 sticky top-28">
                        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                            <h2 className="text-gray-500 font-bold text-sm uppercase p-4 border-b border-gray-100 tracking-wider">Price Details</h2>
                            <div className="p-4 flex flex-col gap-5">
                                <div className="flex justify-between items-center text-gray-700">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span className="tabular-nums">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span>Discount</span>
                                    <span className="text-green-600 font-medium tracking-tight">− ₹0</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span>Delivery Charges</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 line-through text-sm tabular-nums">₹40</span>
                                        <span className="text-green-600 font-medium uppercase tracking-tighter">Free</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-dashed border-gray-200 pt-5 mt-5 flex justify-between items-center text-lg font-bold text-gray-900 leading-none">
                                    <span>Total Amount</span>
                                    <span className="text-xl tabular-nums">₹{totalAmount}</span>
                                </div>
                                
                                <div className="bg-green-50 text-green-700 text-sm font-bold p-3 rounded-sm text-center border border-green-100">
                                    You will save ₹40 on this order
                                </div>
                            </div>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-col gap-4 p-4 text-gray-500">
                            <div className="flex items-center gap-3 text-xs leading-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-gray-400 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.548 4.075 10.56 9 12.139a11.998 11.998 0 009-12.142c0-1.314-.21-2.57-.598-3.751A11.956 11.956 0 0112 2.714z" />
                                </svg>
                                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
