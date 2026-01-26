import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoriteButton = ({ product, className = "" }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md border border-gray-100 hover:border-red-600 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite(product._id) ? 'red' : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;