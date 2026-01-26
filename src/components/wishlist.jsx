import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { favorites } = useFavorites();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Convert favorites object to array of products
    const favoriteProducts = Object.values(favorites);
    setProducts(favoriteProducts);
  }, [favorites]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">My Wishlist</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 p-8 bg-gradient-to-r from-red-50 via-white to-white rounded-2xl border border-red-100 border-l-4 border-l-red-600 shadow-sm animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-red-600 font-semibold text-sm tracking-widest uppercase">Your Favorites</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">My <span className="text-red-600">Wishlist</span></h1>
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-red-50">
             <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Saved Items:</span>
             <span className="text-2xl font-bold text-red-600">{products.length}</span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer bg-white rounded-2xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-700 animate-fade-in-up">
                <Link to={`/product/${product._id}`}>
                  <div className="bg-gray-50/50 h-[280px] relative flex items-center justify-center p-8 transition-colors duration-500 group-hover:bg-red-50/20 border-b border-gray-50 group-hover:border-red-50">
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-0 opacity-100 transition-all duration-300 z-10">
                      <FavoriteButton product={product} />
                    </div>
                    <img
                      src={product.images?.[0] || product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Product'; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <h3 className="font-semibold text-base text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }}
                    className="w-full bg-black hover:bg-red-600 text-white py-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl active:scale-95 group/btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:scale-125 transition-transform duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-3xl font-black text-gray-800 mb-4">Your Wishlist is Empty</h3>
            <p className="text-gray-500 mb-8 text-lg">Start adding your favorite products by clicking the heart icon!</p>
            <Link to="/all-products" className="bg-red-600 hover:bg-black text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;