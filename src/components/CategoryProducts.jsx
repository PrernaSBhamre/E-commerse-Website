import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products for this category
        const productsResponse = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
        console.log('Products by category response:', productsResponse.data);
        setProducts(productsResponse.data.data || []);
        
        // If products have category populated, use the first product's category
        if (productsResponse.data.data && productsResponse.data.data.length > 0 && productsResponse.data.data[0].category) {
          setCategory(productsResponse.data.data[0].category);
        } else {
          // Fallback: fetch category details separately
          try {
            const categoryResponse = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
            setCategory(categoryResponse.data.data || categoryResponse.data);
          } catch (categoryErr) {
            console.warn('Could not fetch category details:', categoryErr);
          }
        }
        
      } catch (err) {
        console.error('Error fetching category products:', err);
        setError('Failed to load products for this category');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage <= 0) return price;
    return price - (price * discountPercentage / 100);
  };

  const isFlashSaleActive = (flashSale) => {
    if (!flashSale || !flashSale.isActive || !flashSale.endTime) return false;
    return new Date(flashSale.endTime) > new Date();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-6 border border-red-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {category?.name || 'Category Products'}
              </h1>
              {category?.description && (
                <p className="text-gray-600 text-lg">{category.description}</p>
              )}
              <p className="text-gray-500 mt-2">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Category ID:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{categoryId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const hasActiveFlashSale = isFlashSaleActive(product.flashSale);
            const discountedPrice = hasActiveFlashSale 
              ? calculateDiscountedPrice(product.price, product.flashSale.discountPercentage)
              : product.price;

            return (
              <div 
                key={product._id} 
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  
                  {/* Flash Sale Badge */}
                  {hasActiveFlashSale && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      {product.flashSale.discountPercentage}% OFF
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
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Price Section */}
                  <div className="mb-3">
                    {hasActiveFlashSale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-red-600">
                          {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Save {product.flashSale.discountPercentage}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    {product.averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{product.averageRating.toFixed(1)}</span>
                        <span>({product.totalReviews})</span>
                      </div>
                    )}
                    <div>
                      <span>Sales: {product.salesCount || 0}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      product.stock > 0 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            There are no products available in this category yet.
          </p>
        </div>
      )}

      {/* Debug Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4 text-sm">
        <h4 className="font-medium text-gray-900 mb-2">Debug Information:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Category ID:</span> {categoryId}
          </div>
          <div>
            <span className="font-medium">Products Count:</span> {products.length}
          </div>
          <div>
            <span className="font-medium">API Endpoint:</span> /api/products/category/{categoryId}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;