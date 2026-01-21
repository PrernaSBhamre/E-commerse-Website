import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icon mapping for different category names
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'Electronics': 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
    'Clothing': 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0021 20.25V3.75a2.25 2.25 0 00-2.25-2.25H10.5z',
    'Home & Kitchen': 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
    'Books': 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    'Sports': 'M15.75 10.356h-3.75v3.75h3.75v-3.75zm-3.75 0H8.25v3.75h3.75v-3.75zM8.25 10.356H4.5v3.75h3.75v-3.75z'
  };
  
  return iconMap[categoryName] || 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'; // default icon
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/categories');
       
        setCategories(response.data.data || response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center py-10 text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
                <div 
                  key={cat._id || index} 
                  className="group cursor-pointer border border-red-500 rounded-lg h-[145px] flex flex-col items-center justify-center gap-4 transition-all duration-300 bg-red-500 hover:bg-white hover:border-red-600 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-2 shadow-sm relative overflow-hidden"
                  onClick={() => {
                    console.log('Direct navigation to category products from grid:', cat._id);
                    navigate(`/categories/${cat._id}/products`);
                  }}
                >
                    
                    {/* Decorative Circle (Subtle texture on the red background) */}
                    <div className="absolute w-20 h-20 bg-white/10 rounded-full blur-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                    {/* Icon - Minimal Line Art */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white group-hover:text-red-600 transition-colors duration-300 z-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d={getCategoryIcon(cat.name)} />
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
