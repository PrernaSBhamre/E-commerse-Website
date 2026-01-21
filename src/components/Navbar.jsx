import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
        {/* Top Bar - Black */}
        <div className="bg-black text-white text-xs py-3 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-200">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                    <a href="#" className="font-bold underline hover:text-red-500 transition-colors">ShopNow</a>
                </div>
                <div className="flex items-center gap-4">
                    <select className="bg-black text-white border-none outline-none cursor-pointer hover:text-red-500 transition-colors">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Main Navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
            
            {/* Logo */}
            <a href="/" className="text-2xl font-bold text-black tracking-wider">
              Exclusive
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-black text-sm font-medium border-b-2 border-transparent hover:border-black transition-all pb-1">Home</a>
              <a href="#contact" className="text-black text-sm font-medium border-b-2 border-transparent hover:border-black transition-all pb-1">Contact</a>
              <a href="#about" className="text-black text-sm font-medium border-b-2 border-transparent hover:border-black transition-all pb-1">About</a>
              <a href="#signup" className="text-black text-sm font-medium border-b-2 border-transparent hover:border-black transition-all pb-1">Sign Up</a>
            </div>

            {/* Right Section: Search & Icons */}
            <div className="flex items-center gap-6 ml-auto md:ml-0">
                {/* Search */}
                <div className="hidden md:flex relative bg-gray-100 rounded py-2 px-4 w-[240px]">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-transparent text-xs w-full focus:outline-none placeholder-gray-500 text-black"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-800 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-red-600 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 text-black">
                    <button className="hover:text-red-600 transition-colors relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">4</span>
                    </button>
                    <button className="hover:text-red-600 transition-colors relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                         <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">2</span>
                    </button>
                     <button className="hover:text-red-600 transition-colors md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 top-full shadow-lg">
              <div className="flex flex-col space-y-4 p-6">
                <a href="#home" className="text-black font-medium hover:text-red-600">Home</a>
                <a href="#contact" className="text-black font-medium hover:text-red-600">Contact</a>
                <a href="#about" className="text-black font-medium hover:text-red-600">About</a>
                <a href="#signup" className="text-black font-medium hover:text-red-600">Sign Up</a>
                <div className="relative">
                     <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-gray-100 rounded py-2 px-4 w-full text-sm focus:outline-none"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
              </div>
            </div>
          )}
        </header>
    </div>
  );
};

export default Navbar;
