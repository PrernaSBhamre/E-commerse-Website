import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';
import api from '../utils/api';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
                setProducts(response.data.data || []);
            } catch (err) {
                console.error('Error searching products:', err);
                setError('Failed to load search results');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Search Results for <span className="text-red-600">"{query}"</span>
                </h1>
                <p className="text-gray-500 mt-2">Found {products.length} result(s)</p>
            </div>

            {error ? (
                <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
                    {error}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try checking your spelling or use different keywords.</p>
                    <button 
                        onClick={() => navigate('/all-products')}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Browse All Products
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product._id} className="group cursor-pointer bg-white rounded-xl border border-gray-100 hover:border-red-500/30 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <Link to={`/product/${product._id}`}>
                                <div className="bg-gray-50 h-[250px] relative flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-red-50/30 border-b border-gray-50 group-hover:border-red-100">
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-10">
                                        <FavoriteButton product={product} />
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
                                                alert(`${product.name} added to cart!`);
                                            }}
                                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-black"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <img
                                        src={product.images && product.images[0] ? product.images[0] : product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                                    />
                                </div>
                                <div className="p-4 bg-white relative transition-colors duration-500">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors line-clamp-1">{product.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
