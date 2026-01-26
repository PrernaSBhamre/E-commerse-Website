import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:5000/api/products/new-arrivals');


        // Handle the API response structure
        const newProducts = response.data.data || [];
        setProducts(newProducts);

      } catch (err) {

        setError('Failed to load new arrival products');
        // Set empty array if API fails
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-20">

        {/* Premium Gradient Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
          <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3">
                   <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                   <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Featured</h2>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">New <span className="text-red-600">Arrival</span></h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-[600px] animate-fade-in-up animation-delay-300">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-800 rounded-xl relative overflow-hidden border border-gray-700 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18z" />
          </svg>
          <h2 className="mt-2 text-xl font-bold text-red-800">Error Loading New Arrivals</h2>
          <p className="mt-1 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-20">

      {/* Premium Gradient Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
        <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
                 <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                 <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Featured</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">New <span className="text-red-600">Arrival</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-[600px] animate-fade-in-up animation-delay-300">

        {/* Left Large Item - First New Arrival */}
        {products.length > 0 && (
          <Link to={`/product/${products[0]._id}`} className="md:col-span-2 bg-black rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)]">
            <img
              src={products[0].images && products[0].images[0] ? products[0].images[0] : 'https://placehold.co/600x400?text=No+Image'}
              alt={products[0].name}
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x400?text=No+Image';
              }}
            />
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

            <div className="absolute bottom-8 left-8 max-w-xs z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold mb-2 text-white">{products[0].name}</h3>
              <p className="text-gray-300 text-sm mb-6 line-clamp-2">{products[0].description || 'New product'}</p>
              <span className="bg-[#DB4444] text-white px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest group-hover:bg-red-700 transition-all shadow-lg inline-block">Shop Now</span>
            </div>
          </Link>
        )}

        {/* Right Column */}
        <div className="md:col-span-2 grid grid-cols-2 gap-8">

          {/* Top Full Width - Second New Arrival */}
          {products.length > 1 && (
            <Link to={`/product/${products[1]._id}`} className="col-span-2 bg-[#0D0D0D] rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)]">
                <img
                  src={products[1].images && products[1].images[0] ? products[1].images[0] : 'https://placehold.co/600x400?text=No+Image'}
                  alt={products[1].name}
                  className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>

                <div className="absolute bottom-8 left-8 z-10 max-w-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-2 text-white">{products[1].name}</h3>
                    <p className="text-gray-300 text-xs mb-6">{products[1].description || 'New product'}</p>
                    <span className="bg-[#DB4444] text-white px-6 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest group-hover:bg-red-700 transition-all shadow-md inline-block">Shop Now</span>
                </div>
            </Link>
          )}

          {/* Bottom Row - Remaining Products */}
          {products.slice(2, 4).map((product, index) => (
            <Link to={`/product/${product._id}`} key={product._id} className="bg-black rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)] p-4 flex justify-center items-center">
              <div className="absolute inset-0 bg-radial-gradient from-red-900/20 to-black z-0"></div>
              <img
                src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/600x400?text=No+Image'}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 z-0 opacity-90"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400?text=No+Image';
                }}
              />
               <div className="absolute bottom-4 left-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg font-bold mb-1 text-white">{product.name}</h3>
                <p className="text-gray-300 text-[10px] mb-4">{product.description ? product.description.substring(0, 30) + '...' : 'New product'}</p>
                <span className="bg-[#DB4444] text-white px-4 py-2 rounded-sm font-bold text-[10px] uppercase tracking-widest group-hover:bg-red-700 transition-all shadow-sm inline-block">Shop Now</span>
              </div>
            </Link>
          ))}

          {/* Fill empty slots if needed */}
          {products.length < 3 && (
            <div className="bg-gray-800 rounded-xl relative overflow-hidden border border-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400 p-8">
                <div className="text-4xl mb-2">📦</div>
                <p>No products available</p>
              </div>
            </div>
          )}
          {products.length < 4 && products.length >= 3 && (
            <div className="bg-gray-800 rounded-xl relative overflow-hidden border border-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400 p-8">
                <div className="text-4xl mb-2">📦</div>
                <p>No products available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
