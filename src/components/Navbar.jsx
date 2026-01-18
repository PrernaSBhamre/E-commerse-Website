import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-black">
          Exclusive
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-black border-b-2 border-red-500">Home</a>
          <a href="#contact" className="text-black hover:text-red-500">Contact</a>
          <a href="#about" className="text-black hover:text-red-500">About</a>
          <a href="#signup" className="text-black hover:text-red-500">Sign Up</a>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="px-3 py-3 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500 gap-3"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              
            </span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-xl text-black">
            <a href="#favorites" className="hover:text-red-500">❤️</a>
            <a href="#cart" className="hover:text-red-500">🛒</a>
          </div>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden flex flex-col space-y-1 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-3 p-4">
            <a href="#home" className="text-black border-b-2 border-red-500">Home</a>
            <a href="#contact" className="text-black hover:text-red-500">Contact</a>
            <a href="#about" className="text-black hover:text-red-500">About</a>
            <a href="#signup" className="text-black hover:text-red-500">Sign Up</a>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="px-3 py-3 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex items-center gap-4 text-xl text-black pt-2">
              <a href="#favorites" className="hover:text-red-500">❤️</a>
              <a href="#cart" className="hover:text-red-500">🛒</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
