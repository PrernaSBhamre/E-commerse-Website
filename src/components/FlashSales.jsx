import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { useCart } from './CartContext';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const [products, setProducts] = useState([]);
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite } = useFavorites();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/flash-sales")
      .then((response) => {
        const flashSaleProducts = response.data.data || [];
        setProducts(flashSaleProducts);
        setAnimatedProducts(new Array(flashSaleProducts.length).fill(false));
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedProducts(new Array(products.length).fill(true));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 mt-24 mb-20 relative">
      
      {/* Standardized Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-10 lg:gap-20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Today's</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Flash <span className="text-red-600">Sales</span></h1>
          </div>

          {/* Minimalist Timer */}
          <div className="flex items-center gap-6 select-none border-l border-gray-100 pl-10 hidden lg:flex">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{unit.label}</span>
                  <span className="text-2xl font-black tabular-nums tracking-tighter text-black">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                {idx < 3 && (
                  <span className="text-red-300 text-xl font-bold mt-2">:</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <button 
          onClick={() => navigate('/flash-sales')}
          className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
        >
          View All
        </button>
      </div>

      {/* Products Row */}
      <div className="overflow-x-auto pb-10 hide-scrollbar scroll-smooth">
        <div className="flex gap-8 w-max px-1">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product._id || index}
                className={`w-[270px] group cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-500 ${animatedProducts[index] ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/product/${product._id}`}>
                  {/* Image Section */}
                  <div className="bg-gray-50 h-[260px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/20 border-b border-gray-50 group-hover:border-red-100">
                    
                    {product.flashSale?.discountPercentage && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm z-10">
                        -{product.flashSale.discountPercentage}%
                      </div>
                    )}
                    
                    <div className={`absolute top-3 right-3 flex flex-col gap-2 ${isFavorite(product._id) ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'} group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10`}>
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
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

                  {/* Content Section - Updated to include Add to Cart below pricing */}
                  <div className="p-5 flex flex-col gap-3 transition-colors duration-500 group-hover:bg-red-50/5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors truncate">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</span>
                        {(product.flashSale?.originalPrice || product.originalPrice) > product.price && (
                          <span className="text-gray-400 line-through text-xs font-medium">
                            {formatPrice(product.flashSale?.originalPrice || product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(product.averageRating || 5) ? "currentColor" : "#E5E7EB"} className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-400 text-xs font-medium">({product.totalReviews || 0})</span>
                      </div>
                    </div>
                  </div>
                </Link>


              </div>
            ))
          ) : (
            <div className="w-full text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-bold">No active flash sales right now. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-b border-gray-100 mt-20"></div>
    </div>
  );
};

export default FlashSales;
