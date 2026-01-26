import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

const AllProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data.data || [];
        setProducts(allProducts);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || 
        (product.category && 
          (typeof product.category === 'object' 
            ? product.category._id === selectedCategory 
            : product.category === selectedCategory));
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.averageRating || 0) - (a.averageRating || 0);
        case 'sales': return (b.salesCount || 0) - (a.salesCount || 0);
        case 'newest': default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-500 font-medium">Preparing our collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-medium">All Products</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        {/* Standardized Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 p-8 bg-gradient-to-r from-red-50 via-white to-white rounded-2xl border border-red-100 border-l-4 border-l-red-600 shadow-sm animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-red-600 rounded-full animate-pulse"></span>
              <h2 className="text-red-600 font-bold text-sm tracking-widest uppercase">Full Catalog</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight">Explore <span className="text-red-600">Our Products</span></h1>
            <p className="text-gray-400 font-medium max-w-md mt-1">Browse through our complete range of high-quality electronics and accessories.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-red-50">
             <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Items:</span>
             <span className="text-2xl font-black text-red-600">{filteredAndSortedProducts.length}</span>
          </div>
        </div>

        {/* Filters Section - Redesigned for Professional look */}
        <div className="mb-12 p-8 bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Search Products</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="E.g. Gaming Mouse..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition-all shadow-sm group-hover:shadow-md font-medium"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-600 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Sort Results</label>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="w-full px-4 py-4 bg-white border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition-all shadow-sm font-medium appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="sales">Best Selling</option>
              </select>
            </div>
            
            <div className="flex items-end md:col-span-1">
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory(''); setSortBy('newest'); setCurrentPage(1); }}
                className="w-full py-4 bg-gray-100 hover:bg-black hover:text-white text-gray-600 font-bold rounded-xl transition-all shadow-sm active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
            {currentProducts.map((product) => (
              <div 
                key={product._id} 
                className="group cursor-pointer bg-white rounded-2xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-700 animate-fade-in-up"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="bg-gray-50/50 h-[280px] relative flex items-center justify-center p-8 transition-colors duration-500 group-hover:bg-red-50/20 border-b border-gray-50 group-hover:border-red-50">
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-md border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>
                    </div>

                    <img 
                      src={product.images?.[0] || product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Product'; }}
                    />
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-red-600">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 pb-6">
                  {/* Add to Cart - Hidden by default, shown on hover */}
                  <button 
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }}
                    className="w-full bg-black hover:bg-red-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl group/btn active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover/btn:scale-125 transition-transform duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Add To Cart
                  </button>
                </div>
              </div>

            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <h3 className="text-3xl font-black text-gray-800 mb-4">No Products Found</h3>
            <p className="text-gray-400 font-medium text-lg">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        {/* Standardized Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-2 border-gray-100 text-gray-800 hover:border-red-600 shadow-sm'}`}
            >
              Prev
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === pageNum ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border-2 border-gray-100 text-gray-800 hover:border-red-600 shadow-sm'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;