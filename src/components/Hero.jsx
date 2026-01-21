import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "Winter Collection 2026",
    subtitle: "Discover the hottest trends for the season.",
    button: "Shop Now",
    color: "text-white"
  },
  {
    id: 2,
    image: "https://img.freepik.com/premium-photo/compilation-electronic-gadgets-black-background_893571-15167.jpg?w=826",
    title: "Exclusive Tech Deals",
    subtitle: "Upgrade your gear with our premium selection.",
    button: "View Gadgets",
    color: "text-white"
  },
  {
    id: 3,
    image: "https://homeandtexture.com/wp-content/uploads/2023/12/A72656CE-47CE-4EDB-A7B1-D4764F5024C4.jpeg",
    title: "Modern Home Aesthetics",
    subtitle: "Elevate your living space with minimal designs.",
    button: "Explore Decor",
    color: "text-white"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2072&auto=format&fit=crop",
    title: "Beauty & Wellness",
    subtitle: "Glow up with our new organic skincare line.",
    button: "Shop Beauty",
    color: "text-white"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
    title: "Sports & Fitness",
    subtitle: "Achieve your goals with high-performance gear.",
    button: "Start Training",
    color: "text-white"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Debug function to print categories
  const debugCategories = () => {
    console.log('=== HERO COMPONENT DEBUG ===');
    console.log('Categories state:', categories);
    console.log('Categories length:', categories?.length || 0);
    console.log('Categories data type:', typeof categories);
    console.log('Is array:', Array.isArray(categories));
    
    if (categories && categories.length > 0) {
      console.table(categories.map(cat => ({
        id: cat._id,
        name: cat.name,
        description: cat.description
      })));
    }
  };

  // Call debug on component mount
  useEffect(() => {
    // Delay the debug call slightly to ensure data loads
    const timer = setTimeout(debugCategories, 1000);
    return () => clearTimeout(timer);
  }, [categories]);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => {
        console.log('Hero categories response:', res.data);
        // Handle both possible response structures
        const categoriesData = res.data.data || res.data;
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .catch(err => {
        console.error('Error fetching categories in Hero:', err);
        setCategories([]); // Set empty array on error
      });
  }, []);
  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]">
        {/* Mobile Categories Dropdown */}
        <div className="md:hidden w-full mb-4">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-red-600 px-4 py-3 flex items-center justify-between cursor-pointer" 
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                Browse Categories
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                   className={`w-5 h-5 text-white transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            
            {isMobileMenuOpen && (
              <ul className="py-2 max-h-60 overflow-y-auto">
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category._id}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors group"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Mobile direct navigation to category products:', category._id);
                          navigate(`/categories/${category._id}/products`);
                          setIsMobileMenuOpen(false); // Close menu after navigation
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                          </svg>
                          {category.name}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-red-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-500 italic text-center">
                    Loading categories...
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        {/* Sidebar (Categories) - 25% width on desktop */}
        <div className="hidden md:flex flex-col w-1/4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
          <div className="bg-red-600 px-5 py-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              Categories
            </h3>
          </div>
          <ul className="flex flex-col text-sm font-medium text-gray-700 h-full overflow-y-auto">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} className="border-b border-gray-50 last:border-none">
                  <a 
                    href="#" 
                    className="flex items-center justify-between px-5 py-3 hover:bg-red-50 hover:text-red-600 transition-colors group duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Direct navigation to category products:', category._id);
                      navigate(`/categories/${category._id}/products`);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                      {category.name}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                </li>
              ))
            ) : (
              <li className="px-5 py-3 text-gray-500 italic">
                Loading categories...
              </li>
            )}
          </ul>
        </div>

        {/* Slider - 75% width on desktop */}
        <div className="w-full md:w-3/4 relative rounded-lg overflow-hidden shadow-md group">
          <div
            className="flex transition-transform duration-[2500ms] ease-in-out h-full"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${current * (100 / slides.length)}%)`
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="h-full relative" style={{ width: `${100 / slides.length}%` }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-fill"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start text-left p-12">
                  <h1 className={`text-4xl md:text-6xl font-bold mb-4 text-white transform transition-all duration-700 delay-100 ${current === slides.indexOf(slide) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {slide.title}
                  </h1>
                  <p className={`text-lg md:text-xl mb-8 text-white max-w-lg transform transition-all duration-700 delay-200 ${current === slides.indexOf(slide) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {slide.subtitle}
                  </p>
                  <button className={`px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-all duration-300 transform ${current === slides.indexOf(slide) ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} delay-300 shadow-md`}>
                    {slide.button}
                  </button>
                </div>
              </div>
            ))}
          </div>


          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${current === index ? "bg-red-600 w-6" : "bg-white/50 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
