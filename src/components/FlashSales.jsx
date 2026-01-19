import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    rating: 88,
    discount: 40,
    image: "https://globalbrandeshop.com/media/thumbnail/I332WE12NH193.jpg",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    rating: 75,
    discount: 35,
    image: "https://thumb.photo-ac.com/e6/e63ac6d2504334def6ebce5a248d8d31_t.jpeg",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    rating: 99,
    discount: 30,
    image: "https://www.asus.com/media/Odin/Websites/global/Tab/20240326013834.jpg",
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    rating: 99,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/61bN4YgUQ+L.jpg",
  },
    {
    id: 5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    rating: 99,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/61kMLykR7IL._AC_SX679_.jpg",
  },
    {
    id: 6,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    rating: 99,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/61kMLykR7IL._AC_SX679_.jpg",
  },
];

const FlashSales = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    });

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

  return (
    <div className="container mx-auto px-4 mt-20 mb-12">
      {/* Header Container with premium styling */}
      {/* Premium Header - No Shadow */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-8 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 transition-all duration-500 animate-fade-in-up group/header relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 w-full relative z-10">
            <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3">
                     <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                     <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Today's Special</h2>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Flash <span className="text-red-600">Sales</span></h1>
            </div>
            
            {/* Boxed Timer */}
            <div className="flex items-center gap-4 text-center">
                <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Days</span>
                    <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-lg  border-red-100 group-hover/header:border-red-200 transition-colors">
                        <span className="text-3xl font-bold font-mono text-black">{String(timeLeft.days).padStart(2, '0')}</span>
                    </div>
                </div>
                <span className="text-red-400 text-3xl font-bold mt-2">:</span>
                
               <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-75">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Hours</span>
                    <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-lg shadow-sm border border-red-100 group-hover/header:border-red-200 transition-colors">
                        <span className="text-3xl font-bold font-mono text-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                    </div>
                </div>
                 <span className="text-red-400 text-3xl font-bold mt-2">:</span>
                
               <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-100">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Mins</span>
                    <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-lg shadow-sm border border-red-100 group-hover/header:border-red-200 transition-colors">
                         <span className="text-3xl font-bold font-mono text-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    </div>
                </div>
                 <span className="text-red-400 text-3xl font-bold mt-2">:</span>

                <div className="flex flex-col items-center gap-1 group-hover/header:-translate-y-1 transition-transform duration-300 delay-150">
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Secs</span>
                    <div className="flex items-center justify-center w-14 h-14 bg-red-600 rounded-lg shadow-lg shadow-red-200">
                         <span className="text-3xl font-bold font-mono text-white animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
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

      {/* Products Row - Unified Card Design */}
      <div className="overflow-x-auto pb-12 hide-scrollbar">
          <div className="flex gap-8 w-max px-2"> 
            {products.map((product) => (
                <div key={product.id} className="w-[280px] group relative cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_8px_30px_rgb(220,38,38,0.15)] transition-all duration-500">
                    
                    {/* Top Section: Image & Overlays */}
                    <div className="bg-gray-50 h-[260px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/30 border-b border-gray-50 group-hover:border-red-100">
                        {/* Tags */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                             <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-wider shadow-sm shadow-red-200">-{product.discount}%</span>
                             <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-wider shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">Hot</span>
                        </div>
                        
                        {/* Side Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-x-4 group-hover:translate-x-0">
                            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-red-600 group/btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                             <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-red-600 group/btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Image */}
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-sm" />
                    </div>

                    {/* Content Section */}
                    <div className="p-4 bg-red-50 relative transition-colors duration-500">
                        <div className="flex flex-col gap-2">
                             <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-1">{product.name}</h3>
                             
                             <div className="flex items-center gap-2">
                                 <span className="text-red-600 font-bold text-lg">₹{product.price}</span>
                                 <span className="text-gray-400 line-through text-xs font-medium">₹{product.originalPrice}</span>
                             </div>

                             <div className="flex items-center gap-1.5">
                                 <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "#E5E7EB"} className="w-3.5 h-3.5">
                                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                 </div>
                                 <span className="text-gray-400 text-xs font-medium">({product.rating})</span>
                             </div>
                        </div>

                         {/* Add To Cart - now overlays content on hover or slides up smoothly from bottom of card */}
                        <div className="absolute inset-x-0 bottom-0 top-[60px] flex items-end justify-center pointer-events-none">
                             <button className="w-full bg-black hover:bg-red-600 text-white py-3 text-xs font-bold uppercase tracking-wider pointer-events-auto transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                 </svg>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
          </div>
      </div>

      <div className="flex justify-center mt-6">
          <button className="px-10 py-3 bg-red-600 text-white font-bold text-sm tracking-wide rounded-sm shadow-red-200 shadow-lg hover:bg-black hover:shadow-gray-400 transition-all duration-300 transform hover:-translate-y-1">View All Products</button>
      </div>
       <div className="border-b border-gray-100 mt-16"></div>
    </div>
  );
};

export default FlashSales;
