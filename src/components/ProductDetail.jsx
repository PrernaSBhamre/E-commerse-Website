import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import FavoriteButton from './FavoriteButton';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data.data);
        if (response.data.data?.colors?.length > 0) {
          setSelectedColor(response.data.data.colors[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Simple alert for confirmation
    alert(`${product.name} added to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Product not found'}</h2>
        <Link to="/all-products" className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.image];
  const colors = product.colors || ['#A0BCE0', '#E07575'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="bg-white min-h-screen pb-20 pt-32">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Breadcrumb - Matching image style */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-16">
          <Link to="/" className="hover:text-black">Account</Link>
          <span>/</span>
          <Link to="/all-products" className="hover:text-black">{product.category?.name || 'Gaming'}</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Thumbnails list - Vertical stack on the left */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 order-2 lg:order-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`cursor-pointer w-full aspect-square md:w-32 md:h-32 bg-gray-100 rounded-md flex items-center justify-center p-4 border transition-all ${
                  selectedImage === idx ? 'border-gray-400' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>

          {/* Main Image - Large centered area */}
          <div className="lg:col-span-5 bg-gray-100 rounded-md flex items-center justify-center p-12 order-1 lg:order-2">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-[400px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info - Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 order-3">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-sm mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400">({product.
totalReviews || 150} Reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#00FF66]">In Stock</span>
            </div>

            <div className="text-2xl font-medium text-black mt-2">
              {formatPrice(product.price)}
            </div>

            <p className="text-sm text-black leading-relaxed mt-2 line-clamp-3">
              {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
            </p>

            <hr className="border-gray-400 mt-4 mb-2" />

            {/* Colors */}
            <div className="flex items-center gap-4">
              <span className="text-xl font-medium text-black">Colours:</span>
              <div className="flex gap-2">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full border border-black transition-all p-0.5 outline outline-1 outline-offset-1 ${
                      selectedColor === color ? 'outline-black border-black' : 'outline-transparent border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xl font-medium text-black">Size:</span>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 flex items-center justify-center rounded-sm border text-sm font-bold transition-all ${
                      selectedSize === size 
                        ? 'bg-[#DB4444] border-[#DB4444] text-white' 
                        : 'border-black/50 text-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-black/50 rounded-md overflow-hidden h-11 w-40">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 h-full hover:bg-[#DB4444] hover:text-white transition-colors text-2xl flex items-center justify-center border-r border-black/50"
                >−</button>
                <div className="w-14 text-center font-bold text-lg">{quantity}</div>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 h-full bg-[#DB4444] text-white text-2xl flex items-center justify-center"
                >+</button>
              </div>

              <button 
                onClick={() => navigate(`/checkout/${product._id}?quantity=${quantity}`)}
                className="flex-1 bg-black text-white h-11 rounded-sm font-medium hover:bg-gray-800 transition-all px-8 text-sm"
              >
                Buy Now
              </button>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#DB4444] text-white h-11 rounded-sm font-medium hover:bg-red-700 transition-all px-8 text-sm"
              >
                Add to Cart
              </button>

              <FavoriteButton product={product} className="w-11 h-11" />
            </div>

            {/* Delivery Info Boxes */}
            <div className="mt-8 border border-black/50 rounded-md divide-y divide-black/50 overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.542-7.898-8.099-8.098a1.151 1.151 0 00-1.207 1.15V4.25m15.822 7.25H9.75m10.822 0H21m0 0V14.25m0 0h-3.375a1.125 1.125 0 01-1.125-1.125V11.25m-8.174 7.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Free Delivery</h4>
                  <p className="text-[11px] text-black underline font-medium cursor-pointer">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">Return Delivery</h4>
                  <p className="text-[11px] text-black font-medium">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
