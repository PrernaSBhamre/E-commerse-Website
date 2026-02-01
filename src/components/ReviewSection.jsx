import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const ReviewSection = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/reviews/product/${productId}`);
                setReviews(response.data.data || []);
            } catch (err) {
                console.error('Error fetching reviews:', err);
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchReviews();
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to submit a review');
            return;
        }

        try {
            setSubmitting(true);
            
            if (editingReviewId) {
                // Update existing review
                const response = await api.put(`/reviews/${editingReviewId}`, {
                    rating,
                    comment
                });

                if (response.data.success) {
                    setReviews(reviews.map(review => 
                        review._id === editingReviewId ? response.data.data : review
                    ));
                    setComment('');
                    setRating(5);
                    setEditingReviewId(null);
                    alert('Review updated successfully!');
                }
            } else {
                // Create new review
                const response = await api.post('/reviews', {
                    product: productId,
                    rating,
                    comment
                });

                if (response.data.success) {
                    setReviews([response.data.data, ...reviews]);
                    setComment('');
                    setRating(5);
                    alert('Review submitted successfully!');
                }
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (review) => {
        setEditingReviewId(review._id);
        setRating(review.rating);
        setComment(review.comment);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Simplified scroll, might want to target the form specific
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to delete a review');
            return;
        }

        try {
            const response = await api.delete(`/reviews/${reviewId}`);
            if (response.data.success) {
                setReviews(reviews.filter(review => review._id !== reviewId));
                alert('Review deleted successfully');
                
                // If we were editing this review, clear the form
                if (editingReviewId === reviewId) {
                    setEditingReviewId(null);
                    setComment('');
                    setRating(5);
                }
            }
        } catch (err) {
            console.error('Error deleting review:', err);
            alert(err.response?.data?.message || 'Failed to delete review');
        }
    };

    const handleCancelEdit = () => {
        setEditingReviewId(null);
        setComment('');
        setRating(5);
    };

    if (loading) return <div className="mt-10">Loading reviews...</div>;

    return (
        <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold mb-8 text-black">Customer Reviews</h2>
            
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-10" id="review-form">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-black">
                        {editingReviewId ? 'Edit Your Review' : 'Write a Review'}
                    </h3>
                    {editingReviewId && (
                        <button 
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 text-sm underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <label className="font-medium">Rating:</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`w-8 h-8 flex items-center justify-center transition-colors ${
                                        rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Comment:</label>
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            className="bg-white p-3 rounded-md border border-gray-200 outline-none h-32 focus:border-[#DB4444]"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`bg-[#DB4444] text-white py-3 px-8 rounded-sm font-medium self-start hover:bg-red-700 transition-colors ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Processing...' : (editingReviewId ? 'Update Review' : 'Submit Review')}
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-8">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-100 pb-6 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#DB4444] font-bold">
                                        {review.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-black">{review.user?.name || 'User'}</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 text-sm">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                    {user?.id === review.user?._id && (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEdit(review)}
                                            className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                                            title="Edit Review"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(review._id)}
                                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                            title="Delete Review"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
