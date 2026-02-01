import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext";
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cartCount } = useCart();
  const { favorites } = useFavorites();
  const { isAuthenticated, logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const favoritesCount = useMemo(() => {
    return Object.keys(favorites).length;
  }, [favorites]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setMenuOpen(false); // Close mobile menu if open
        }
    }
  };

  return (
    <div className="w-full">
        {/* Top Bar - Black */}
        <div className="bg-black text-white text-[12px] py-2 px-10">
            <div className="container mx-auto flex justify-center items-center relative">
                <div className="flex items-center gap-2">
                    <span className="text-gray-200">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
                    <Link to="/all-products" className="font-bold underline hover:text-red-500 transition-colors">ShopNow</Link>
                </div>
                <div className="absolute right-0 flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors">
                    <span>English</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Main Navigation */}
        <header className="bg-white border-b border-black/10 sticky top-0 z-50">
          <nav className="container mx-auto px-10 py-5 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black tracking-wider">
              Exclusive
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-12">
              <Link to="/" className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2">Home</Link>
              <Link to="/contact" className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2">Contact</Link>
              <Link to="/about" className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2">About</Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2">Login</Link>
                  <Link to="/signup" className="text-black text-base font-normal hover:underline underline-offset-4 decoration-2">Sign Up</Link>
                </>
              )}
            </div>

            {/* Right Section: Search & Icons */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex relative bg-[#F5F5F5] rounded-md py-2.5 px-4 w-[240px]">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-transparent text-[12px] w-full focus:outline-none placeholder-black/50 text-black pr-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => searchTerm.trim() && navigate(`/search?q=${encodeURIComponent(searchTerm)}`)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 text-black">
                    <Link to="/wishlist" className="hover:text-red-600 transition-colors relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        {favoritesCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {favoritesCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="hover:text-red-600 transition-colors relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Account Dropdown - Only show when authenticated */}
                    {isAuthenticated && (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                          className="hover:text-red-600 transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {accountDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <div className="px-4 py-2 border-b border-gray-200">
                              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                            
                            </div>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setAccountDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Manage Profile
                              </div>
                            </Link>
                            <Link
                              to="/orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setAccountDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                My Orders
                              </div>
                            </Link>
                            <Link
                              to="/canceled-orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setAccountDropdownOpen(false)}
                            >
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                My canceled Orders
                              </div>
                            </Link>
                            <div className="border-t border-gray-200">
                              <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                  </svg>
                                  Logout
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                     <button className="hover:text-red-600 transition-colors md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
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
                <Link to="/" className="text-black font-medium hover:text-red-600">Home</Link>
                <Link to="/contact" className="text-black font-medium hover:text-red-600">Contact</Link>
                <Link to="/about" className="text-black font-medium hover:text-red-600">About</Link>
                {isAuthenticated ? (
                  <>
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/profile" className="text-black font-medium hover:text-red-600 block" onClick={() => setMenuOpen(false)}>
                      Manage Profile
                    </Link>
                    <Link to="/orders" className="text-black font-medium hover:text-red-600 block" onClick={() => setMenuOpen(false)}>
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="text-black font-medium hover:text-red-600 block" onClick={() => setMenuOpen(false)}>
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 font-medium hover:text-red-800 text-left block"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-black font-medium hover:text-red-600">Login</Link>
                    <Link to="/signup" className="text-black font-medium hover:text-red-600">Sign Up</Link>
                  </>
                )}
                <div className="relative">
                     <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="bg-gray-100 rounded py-2 px-4 w-full text-sm focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleSearch}
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
