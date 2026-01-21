import React from 'react';

const bestSellingProducts = [
  {
    id: 1,
    name: "The North Coat",
    price: 260,
    originalPrice: 360,
    rating: 65,
    image: "https://m.media-amazon.com/images/I/41K-sFm4LJL._AC_SX679_.jpg",
  },
  {
    id: 2,
    name: "Gucci Duffle Bag",
    price: 960,
    originalPrice: 1160,
    rating: 65,
    image: "https://m.media-amazon.com/images/I/71R2c9+j0zL._AC_SX679_.jpg",
  },
  {
    id: 3,
    name: "RGB Liquid CPU Cooler",
    price: 160,
    originalPrice: 170,
    rating: 65,
    image: "https://m.media-amazon.com/images/I/61b1Itz5ZDL._AC_SX679_.jpg",
  },
  {
    id: 4,
    name: "Small BookSelf",
    price: 360,
    originalPrice: null,
    rating: 65,
    image: "https://m.media-amazon.com/images/I/71c6dcqM2XL._AC_SX679_.jpg",
  },
];

const BestSelling = () => {
  return (
    <div className="container mx-auto px-4 mb-20">
      {/* Premium Header (No Shadow) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
        <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
                 <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                 <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">This Month</h2>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Best Selling <span className="text-red-600">Products</span></h1>
        </div>
        <button className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {bestSellingProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_8px_30px_rgb(220,38,38,0.15)] transition-all duration-500">
            
            {/* Top Section: Image & Actions */}
            <div className="bg-gray-50 h-[260px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/30 border-b border-gray-50 group-hover:border-red-100">
               
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

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-sm"
              />
            </div>
            
            {/* Content Section */}
            <div className="p-4 bg-red-50/30 relative transition-colors duration-500">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold text-lg">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-gray-400 line-through text-xs font-medium">₹{product.originalPrice}</span>
                        )}
                    </div>
                     <div className="flex items-center gap-1.5">
                         <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-400 text-xs font-medium">({product.rating})</span>
                    </div>
                </div>

                 {/* Add To Cart */}
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
  );
};

export default BestSelling;
