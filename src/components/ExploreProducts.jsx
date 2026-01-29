import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';

const ExploreProducts = () => {
  const { addToCart } = useCart();
  const { isFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data.data || [];
        setProducts(allProducts);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Our Products</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Explore Our <span className="text-red-600">Products</span></h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group cursor-pointer bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 h-[250px] flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
        <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
                 <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                 <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Our Products</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Explore Our <span className="text-red-600">Products</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
        {products && products.length > 0 ? (
          products.slice(0, 4).map((product) => (
            <div key={product._id} className="group cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-500">
              <Link to={`/product/${product._id}`}>
                <div className="bg-gray-50 h-[250px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/30 border-b border-gray-50 group-hover:border-red-100">
                  <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10">
                        <FavoriteButton product={product} />
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            alert(`${product.name} added to cart!`);
                          }}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-black"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                          </svg>
                        </button>
                  </div>
                  <img
                    src={product.images && product.images[0] ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                  />
                </div>
                <div className="p-4 bg-red-50/30 relative transition-colors duration-500">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</span>
                        </div>
                    </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
          </div>
        )}
      </div>
       <div className="flex justify-center mt-6">
          <button 
            onClick={() => navigate('/all-products')}
            className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-all font-medium"
          >
            View All Products
          </button>
      </div>
    </div>
  );
};

export default ExploreProducts;
