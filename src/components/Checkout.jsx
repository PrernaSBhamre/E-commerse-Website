import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const initialQuantity = parseInt(searchParams.get('quantity') || '1');
    const [quantity, setQuantity] = useState(initialQuantity);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        saveInfo: false,
        paymentMethod: 'cod'
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data.data);
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token'); 
            const orderData = {
                products: [{
                    product: product._id,
                    quantity: quantity,
                    price: product.price
                }],
                totalPrice: product.price * quantity,
                paymentMethod: formData.paymentMethod,
                shippingAddress: {
                    name: formData.firstName,
                    company: formData.companyName,
                    addressLine1: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.city,
                    phone: formData.phone,
                    email: formData.email
                }
            };

            const response = await axios.post('http://localhost:5000/api/orders', orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                alert('Order placed successfully!');
                navigate('/');
            }
        } catch (err) {
            console.error('Error placing order:', err);
            alert(err.response?.data?.message || 'Failed to place order. Please check if you are logged in.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
    if (error || !product) return <div className="min-h-screen flex items-center justify-center pt-20 text-red-600">{error || 'Product not found'}</div>;

    const subtotal = product.price * quantity;
    const shipping = 0; // Free
    const total = subtotal + shipping;

    return (
        <div className="bg-white min-h-screen pb-20 pt-32">
            <div className="container mx-auto px-4 lg:px-20">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-16">
                    <Link to="/" className="hover:text-black">Account</Link>
                    <span>/</span>
                    <Link to="/all-products" className="hover:text-black">My Account</Link>
                    <span>/</span>
                    <h1 className="text-black font-medium">CheckOut</h1>
                </nav>

                <h1 className="text-3xl font-bold mb-10 tracking-tight">Billing Details</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Billing Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">First Name<span className="text-[#DB4444]">*</span></label>
                            <input
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                type="text"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Company Name</label>
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                type="text"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Street Address<span className="text-[#DB4444]">*</span></label>
                            <input
                                required
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                type="text"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Apartment, floor, etc. (optional)</label>
                            <input
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleChange}
                                type="text"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Town/City<span className="text-[#DB4444]">*</span></label>
                            <input
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                type="text"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Phone Number<span className="text-[#DB4444]">*</span></label>
                            <input
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400">Email Address<span className="text-[#DB4444]">*</span></label>
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="bg-[#F5F5F5] p-3 rounded-sm outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <input
                                id="saveInfo"
                                name="saveInfo"
                                type="checkbox"
                                checked={formData.saveInfo}
                                onChange={handleChange}
                                className="w-5 h-5 accent-[#DB4444]"
                            />
                            <label htmlFor="saveInfo" className="text-sm">Save this information for faster check-out next time</label>
                        </div>
                    </form>

                    {/* Order Summary */}
                    <div className="flex flex-col gap-8 pt-8 lg:pt-0">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-100 p-2 flex items-center justify-center rounded-sm">
                                        <img src={product.images?.[0] || product.image} alt="" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-sm">{product.name}</span>
                                        <div className="flex items-center border border-black/30 rounded-sm overflow-hidden h-7 w-24">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                className="flex-1 h-full hover:bg-[#DB4444] hover:text-white transition-colors text-lg flex items-center justify-center border-r border-black/30"
                                            >−</button>
                                            <div className="w-8 text-center text-xs font-bold">{quantity}</div>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(q => q + 1)}
                                                className="flex-1 h-full hover:bg-black hover:text-white transition-colors text-lg flex items-center justify-center"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-medium">₹{product.price * quantity}</span>
                            </div>

                            <div className="border-b border-gray-300 py-4 flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="border-b border-gray-300 py-4 flex justify-between">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>

                            <div className="py-4 flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 font-medium">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={formData.paymentMethod === 'online'}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-black"
                                    />
                                    <span>Bank</span>
                                </div>
                                <div className="flex items-center gap-2 grayscale brightness-125 opacity-50">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="MasterCard" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 font-medium">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash on delivery"
                                    checked={formData.paymentMethod === 'cash on delivery'}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-black"
                                />
                                <span>Cash on delivery</span>
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="flex items-stretch gap-4">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="flex-1 border border-black p-3 outline-none rounded-sm"
                            />
                            <button className="bg-[#DB4444] text-white px-8 py-3 rounded-sm font-medium hover:bg-red-700 transition-colors">
                                Apply Coupon
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full bg-[#DB4444] text-white py-4 rounded-sm font-medium text-lg hover:bg-red-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
