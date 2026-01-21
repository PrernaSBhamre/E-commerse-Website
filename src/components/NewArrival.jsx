import React from 'react';

const NewArrival = () => {
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
        
        {/* Left Large Item - PlayStation 5 */}
        <div className="md:col-span-2 bg-black rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)]">
          <img 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
            alt="PlayStation 5" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
          />
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute bottom-8 left-8 max-w-xs z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl font-bold mb-2 text-white">PlayStation 5</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">Black and White version of the PS5 coming out on sale.</p>
            <button className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors">Shop Now</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 grid grid-cols-2 gap-8">
            
            {/* Top Full Width - Women's Collections */}
             <div className="col-span-2 bg-[#0D0D0D] rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)]">
                 <img 
                    src="https://images.unsplash.com/photo-1520170350707-b21e56ca9805?q=80&w=2073&auto=format&fit=crop" 
                    alt="Women's Collections" 
                    className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>

                <div className="absolute bottom-8 left-8 z-10 max-w-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-2 text-white">Women's Collections</h3>
                    <p className="text-gray-300 text-xs mb-4">Featured woman collections that give you another vibe.</p>
                    <button className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors">Shop Now</button>
                </div>
            </div>

            {/* Bottom Left - Speakers */}
            <div className="bg-black rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)] p-4 flex justify-center items-center">
                  <div className="absolute inset-0 bg-radial-gradient from-red-900/20 to-black z-0"></div>
                  <img 
                    src="https://m.media-amazon.com/images/I/71u79k3hXIL._AC_SX679_.jpg" 
                    alt="Speakers" 
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 z-0 opacity-90"
                />
                 <div className="absolute bottom-4 left-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg font-bold mb-1 text-white">Speakers</h3>
                    <p className="text-gray-300 text-xs mb-2">Amazon wireless speakers.</p>
                    <button className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors">Shop Now</button>
                </div>
            </div>

            {/* Bottom Right - Perfume */}
            <div className="bg-black rounded-xl relative overflow-hidden group cursor-pointer border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)] p-4 flex justify-center items-center">
                 <div className="absolute inset-0 bg-radial-gradient from-red-900/20 to-black z-0"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
                    alt="Perfume" 
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 z-0 opacity-90"
                />
                 <div className="absolute bottom-4 left-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg font-bold mb-1 text-white">Perfume</h3>
                    <p className="text-gray-300 text-xs mb-2">GUCCI INTENSE OUD EDP.</p>
                    <button className="text-white font-medium underline decoration-red-600 decoration-2 underline-offset-4 hover:text-red-500 transition-colors">Shop Now</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
