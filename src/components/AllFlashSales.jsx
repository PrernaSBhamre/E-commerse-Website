import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllFlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/products/flash-sales');
        
        // Handle the API response structure
        const flashSaleProducts = response.data.data || [];
        setProducts(flashSaleProducts);
        
      } catch (err) {
        console.error('Error fetching flash sales:', err);
        setError('Failed to load flash sale products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateSavings = (currentPrice, originalPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(originalPrice - currentPrice);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading flash sale products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-2 text-xl font-bold text-red-800">Error Loading Products</h2>
          <p className="mt-1 text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <span className="text-4xl">🔥</span>
                  All Flash Sale Products
                </h1>
                <p className="text-gray-600 text-lg">
                  Limited time offers with unbeatable discounts
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>Showing {products.length} products</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Live Deals
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link 
                  to="/"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const savings = calculateSavings(
              product.price, 
              product.flashSale?.originalPrice
            );
            const hasActiveFlashSale = product.flashSale?.isActive && 
              new Date(product.flashSale.endTime) > new Date();

            return (
              <div 
                key={product._id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group relative"
              >
                {/* Flash Sale Badge */}
                {hasActiveFlashSale && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                      🔥 {product.flashSale.discountPercentage}% OFF
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x400?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No Image Available</span>
                    </div>
                  )}
                  
                  {/* Stock Indicator */}
                  <div className="absolute top-3 right-3">
                    {product.stock > 10 ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      
                      {product.flashSale?.originalPrice && product.flashSale.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.flashSale.originalPrice)}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                            Save ₹{savings}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {product.flashSale?.discountPercentage && product.flashSale.discountPercentage > 0 && (
                      <div className="mt-2">
                        <span className="text-xs bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-2 py-1 rounded-full font-medium">
                          {product.flashSale.discountPercentage}% discount applied
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span>{(product.averageRating || 4).toFixed(1)}</span>
                      {product.totalReviews > 0 && (
                        <span>({product.totalReviews})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {product.salesCount > 0 && (
                        <span>🔥 {product.salesCount} sold</span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.stock > 0 
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-black hover:to-gray-800 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        ADD TO CART
                      </>
                    ) : (
                      'OUT OF STOCK'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flash Sales Available</h3>
          <p className="text-gray-600 mb-6">
            There are currently no active flash sale products. Check back soon for amazing deals!
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">🔥 Limited Time Offers</span>
            <span className="flex items-center gap-1">⚡ Lightning Fast Deals</span>
            <span className="flex items-center gap-1">💰 Unbeatable Prices</span>
          </div>
          <Link 
            to="/"
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      )}

      {/* Debug Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4 text-sm">
        <h4 className="font-medium text-gray-900 mb-2">Debug Information:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Total Products:</span> {products.length}
          </div>
          <div>
            <span className="font-medium">API Endpoint:</span> /api/products/flash-sales
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFlashSales;