import React from 'react';

const categories = [
  { name: 'Phones', icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0021 20.25V3.75a2.25 2.25 0 00-2.25-2.25H10.5z' },
  { name: 'Computers', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25' },
  { name: 'SmartWatch', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' }, // Simplified clock icon for smartwatch
  { name: 'Camera', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
  { name: 'HeadPhones', icon: 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z' }, // Audio ish
  { name: 'Gaming', icon: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z' },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 mb-20">
       {/* Premium Header (No Shadow) */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-6 bg-gradient-to-r from-red-50 via-white to-white rounded-xl border border-red-100 border-l-4 border-l-red-600 animate-fade-in-up">
            <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3">
                     <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
                     <h2 className="text-red-600 font-semibold text-sm tracking-wide uppercase">Categories</h2>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">Browse By <span className="text-red-600">Category</span></h1>
            </div>
             {/* Navigation */}
             <div className="hidden md:flex gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
                 <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md shadow-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
             </div>
        </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((cat, index) => (
                <div key={index} className="group cursor-pointer border border-red-500 rounded-lg h-[145px] flex flex-col items-center justify-center gap-4 transition-all duration-300 bg-red-500 hover:bg-white hover:border-red-600 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-2 shadow-sm relative overflow-hidden">
                    
                    {/* Decorative Circle (Subtle texture on the red background) */}
                    <div className="absolute w-20 h-20 bg-white/10 rounded-full blur-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                    {/* Icon - Minimal Line Art */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white group-hover:text-red-600 transition-colors duration-300 z-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                    
                    {/* Label */}
                    <span className="font-medium text-base text-white group-hover:text-red-600 transition-colors duration-300 z-10">{cat.name}</span>
                </div>
            ))}
         </div>
         <div className="border-b border-gray-100 mt-16"></div>

    </div>
  );
};

export default Categories;
