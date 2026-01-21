import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const FlashSales = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    });

  const [products, setProducts] = useState([]);
  const [animatedProducts, setAnimatedProducts] = useState(Array(products.length).fill(false));
  const navigate = useNavigate();

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

        // Handle the API response structure: { success: true, count: X, data: [...] }
        const flashSaleProducts = response.data.data || [];
        setProducts(flashSaleProducts);
      })
      .catch((error) => {
        
        // Set empty array if API fails
        setProducts([]);
      });
  }, []);

  // Trigger product animations when they come into view
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProducts(Array(products.length).fill(true));
    }, 500);
    return () => clearTimeout(timer);
  }, [products]);
  

  return (
    <div className="container mx-auto px-4 mt-20 mb-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header Container with premium styling */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-8 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 transition-all duration-500 animate-fade-in-up group/header relative overflow-hidden z-10">
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 to-yellow-500/20 opacity-0 group-hover/header:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 w-full relative z-10">
            <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3">
                     <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                     <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase animate-pulse">🔥 Today's Special</h2>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Flash <span className="text-red-600 drop-shadow-lg">Sales</span>
                </h1>
                <p className="text-gray-600 text-sm mt-2 animate-fade-in-up animation-delay-300">Limited time offers - Don't miss out!</p>
            </div>
            
            {/* Boxed Timer with Fire Effects */}
            <div className="flex items-center gap-4 text-center relative">
                {/* Fire particles around timer */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-30 animation-delay-1000"></div>
                
                <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 relative z-10">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Days</span>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg shadow-red-500/30 border-2 border-white group-hover/header:border-yellow-300 transition-all duration-300 transform group-hover/header:scale-110">
                        <span className="text-3xl font-bold font-mono text-white drop-shadow-lg">{String(timeLeft.days).padStart(2, '0')}</span>
                    </div>
                </div>
                <span className="text-red-500 text-4xl font-bold mt-2 animate-pulse">:</span>
                
               <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-75 relative z-10">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Hours</span>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg shadow-orange-500/30 border-2 border-white group-hover/header:border-yellow-300 transition-all duration-300 transform group-hover/header:scale-110">
                        <span className="text-3xl font-bold font-mono text-white drop-shadow-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
                    </div>
                </div>
                 <span className="text-red-500 text-4xl font-bold mt-2 animate-pulse animation-delay-500">:</span>
                
               <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-100 relative z-10">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Mins</span>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl shadow-lg shadow-yellow-500/30 border-2 border-white group-hover/header:border-yellow-300 transition-all duration-300 transform group-hover/header:scale-110">
                         <span className="text-3xl font-bold font-mono text-white drop-shadow-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    </div>
                </div>
                 <span className="text-red-500 text-4xl font-bold mt-2 animate-pulse animation-delay-1000">:</span>

                <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-150 relative z-10">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Secs</span>
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl shadow-lg shadow-red-600/50 border-2 border-white animate-pulse group-hover/header:border-yellow-300 transition-all duration-300 transform group-hover/header:scale-110">
                         <span className="text-3xl font-bold font-mono text-white drop-shadow-lg animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-3 relative z-10">
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
             <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm active:scale-95">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
      </div>

      {/* Products Row - Enhanced Flashy Design */}
      <div className="overflow-x-auto pb-12 hide-scrollbar relative">
          {/* Gradient overlay for extra flair */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50/20 to-transparent pointer-events-none z-0"></div>
          
          <div className="flex gap-8 w-max px-2 relative z-10"> 
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div 
                  key={product._id || product.id || index} 
                  className={`w-[280px] group relative cursor-pointer bg-white rounded-2xl border-2 border-gray-100 hover:border-red-500/50 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${animatedProducts[index] ? 'animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                    
                    {/* Fire/Bonus Animation Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-70 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-0 group-hover:opacity-60 transition-opacity animation-delay-300"></div>
                    
                    {/* Top Section: Image & Overlays */}
                    <div className="bg-gradient-to-br from-gray-50 to-white h-[260px] relative flex items-center justify-center p-6 transition-all duration-500 group-hover:from-red-50/30 group-hover:to-orange-50/20 border-b-2 border-gray-50 group-hover:border-red-200">
                        
                        {/* Animated Tags with Glow */}
                        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                             {/* Flash Sale Tag */}
                             {product.flashSale?.isActive && (
                               <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-red-500/30 transform rotate-3 group-hover:rotate-6 transition-transform duration-300 animate-pulse">🔥 {product.flashSale.discountPercentage}% OFF</span>
                             )}
                             
                             {/* Hot Deal Tag */}
                             <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-purple-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 transform -rotate-2 group-hover:rotate-0">⚡ Hot Deal</span>
                              
                             {/* Low Stock Warning */}
                             {product.stock > 0 && product.stock <= 5 && (
                               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-yellow-500/30 animate-pulse">⚠️ Low Stock</span>
                             )}
                        </div>
                        
                        {/* Side Actions with Enhanced Effects */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-x-4 group-hover:translate-x-0">
                            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg border-2 border-gray-200 hover:border-red-600 transform hover:scale-110 hover:rotate-12 group/btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:animate-bounce">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                             <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg border-2 border-gray-200 hover:border-red-600 transform hover:scale-110 group/btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:animate-spin">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Image with Enhanced Effects */}
                        <img 
                          src={product.images && product.images[0] ? product.images[0] : product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-3 drop-shadow-lg group-hover:drop-shadow-2xl filter group-hover:brightness-110" 
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/300x300?text=No+Image';
                          }}
                        />
                        
                        {/* Floating discount badge */}
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl animate-bounce z-20">
                          {product.flashSale?.discountPercentage 
                            ? `-${product.flashSale.discountPercentage}% OFF` 
                            : `SAVE ₹${Math.round((product.flashSale?.originalPrice || product.price * 1.2) - product.price)}`}
                        </div>
                    </div>

                    {/* Content Section with Enhanced Styling */}
                    <div className="p-5 bg-gradient-to-t from-red-50/50 to-white relative transition-all duration-500 group-hover:from-red-100/30">
                        <div className="flex flex-col gap-3">
                             <h3 className="font-bold text-gray-800 text-base group-hover:text-red-600 transition-colors line-clamp-2 group-hover:scale-105 transform origin-left">{product.name}</h3>
                             
                             {/* Price Section with Flash Sale Info */}
                             <div className="flex items-center gap-3 flex-wrap">
                                 <span className="text-red-600 font-extrabold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">₹{product.price}</span>
                                 
                                 {/* Original Price with strikethrough */}
                                 {product.flashSale?.originalPrice && product.flashSale.originalPrice > product.price && (
                                   <span className="text-gray-400 line-through text-sm font-medium">₹{product.flashSale.originalPrice}</span>
                                 )}
                                 
                                 {/* Discount Percentage Badge */}
                                 {product.flashSale?.discountPercentage && product.flashSale.discountPercentage > 0 && (
                                   <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-full animate-pulse">
                                     SAVE {product.flashSale.discountPercentage}%
                                   </span>
                                 )}
                                 
                                 {/* Savings Amount */}
                                 {product.flashSale?.originalPrice && product.flashSale.originalPrice > product.price && (
                                   <span className="text-blue-600 text-xs font-medium bg-blue-100 px-2 py-0.5 rounded-full">
                                     ₹{Math.round(product.flashSale.originalPrice - product.price)} OFF
                                   </span>
                                 )}
                             </div>

                             {/* Rating Section */}
                             <div className="flex items-center gap-2">
                                 <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor((product.averageRating ) * 5) ? "currentColor" : "#E5E7EB"} className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-300">
                                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                 </div>
                                 <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-0.5 rounded-full">⭐ {(product.averageRating ).toFixed(1)}/5</span>
                                 {product.totalReviews > 0 && (
                                   <span className="text-gray-400 text-xs">({product.totalReviews} reviews)</span>
                                 )}
                             </div>

                             {/* Additional Product Info */}
                             <div className="flex items-center gap-3 text-xs text-gray-500">
                               {product.stock !== undefined && (
                                 <span className={`px-2 py-1 rounded ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                   {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Low Stock (${product.stock})` : 'Out of Stock'}
                                 </span>
                               )}
                               {product.salesCount > 0 && (
                                 <span>🔥 {product.salesCount} sold</span>
                               )}
                             </div>
                        </div>

                         {/* Enhanced Add To Cart Button */}
                        <div className="absolute inset-x-0 bottom-0 top-[70px] flex items-end justify-center pointer-events-none">
                             <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-black hover:to-gray-800 text-white py-3.5 text-sm font-extrabold uppercase tracking-widest pointer-events-auto transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 animate-bounce">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                 </svg>
                                🔥 ADD TO CART
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-ping">!</span>
                            </button>
                        </div>
                    </div>
                </div>
              ))
            ) : (
              // Empty state when no products
              <div className="w-full text-center py-12">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-dashed border-red-200 max-w-md mx-auto">
                  <div className="text-6xl mb-4">⏰</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Flash Sales Coming Soon!</h3>
                  <p className="text-gray-600 mb-6">No flash sale products available at the moment. Check back later for amazing deals!</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">🔥 Limited Time Offers</span>
                    <span className="flex items-center gap-1">⚡ Lightning Fast Deals</span>
                    <span className="flex items-center gap-1">💰 Unbeatable Prices</span>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>

      <div className="flex justify-center mt-8 relative">
          {/* Animated background pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
          </div>
          
          <button 
            onClick={() => navigate('/flash-sales')}
            className="px-12 py-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white font-extrabold text-base tracking-widest rounded-xl shadow-2xl shadow-red-500/40 hover:shadow-red-600/60 hover:from-black hover:via-gray-800 hover:to-black transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative z-10 flex items-center gap-3 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18z" />
            </svg>
            🔥 VIEW ALL FLASH SALES 🔥
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:animate-bounce animation-delay-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
      </div>
       <div className="border-b border-gray-100 mt-16"></div>
    </div>
  );
};

export default FlashSales;
