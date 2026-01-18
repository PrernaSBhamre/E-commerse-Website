import React, { useState, useEffect } from "react";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty"
];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4 h-[500px]">
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
            {categories.map((category, index) => (
              <li key={index} className="border-b border-gray-50 last:border-none">
                 <a href="#" className="flex items-center justify-between px-5 py-3 hover:bg-red-50 hover:text-red-600 transition-colors group duration-200">
                    <span>{category}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                 </a>
              </li>
            ))}
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? "bg-red-600 w-6" : "bg-white/50 hover:bg-white/80"
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
