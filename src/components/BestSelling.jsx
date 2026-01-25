import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/products/best-sellers');
        const bestSellerProducts = response.data.data || [];
        setProducts(bestSellerProducts);
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError('Failed to load best selling products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
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
      <div className="container mx-auto px-4 mb-20 animate-pulse">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
           <div className="h-10 bg-gray-200 rounded w-48"></div>
           <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-50 h-[400px] rounded-xl"></div>
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
                  <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">This Month</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Best Selling <span className="text-red-600">Products</span></h1>
        </div>
        <button 
          onClick={() => navigate('/best-sellers')}
          className="bg-red-600 text-white px-8 py-3 rounded hover:bg-black transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id || product.id} className="group cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-500">
              <Link to={`/product/${product._id}`}>
                <div className="bg-gray-50 h-[260px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/20 border-b border-gray-50 group-hover:border-red-100">
                   <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-x-4 group-hover:translate-x-0">
                        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
                <div className="p-5 flex flex-col gap-3 transition-colors duration-500 group-hover:bg-red-50/5">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors truncate">{product.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</span>
                        </div>
                    </div>
                </div>
              </Link>
              <div className="px-5 pb-5 transition-colors duration-500 group-hover:bg-red-50/5">
                <button className="w-full bg-black hover:bg-red-600 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/addbtn shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
             <p className="text-gray-500 font-bold">No best sellers found for this month.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSelling;
