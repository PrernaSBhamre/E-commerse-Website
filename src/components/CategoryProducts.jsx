import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        
        const productsResponse = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
        setProducts(productsResponse.data.data || []);
        
        if (productsResponse.data.data && productsResponse.data.data.length > 0 && productsResponse.data.data[0].category) {
          setCategory(productsResponse.data.data[0].category);
        } else {
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
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-6 border border-red-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category?.name || 'Category Products'}</h1>
          <p className="text-gray-500">Showing {products.length} products</p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
              <Link to={`/product/${product._id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.images?.[0] || product.image || 'https://placehold.co/300x300?text=No+Image'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=No+Image'; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-xl font-bold text-red-600">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <button 
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    product.stock > 0 ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;