import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState({});
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Sync favorites with database when user logs in
  useEffect(() => {
    if (isAuthenticated && user && !isSynced) {
      syncFavoritesWithDatabase();
    }
  }, [isAuthenticated, user, isSynced]);

  const syncFavoritesWithDatabase = async () => {
    try {
      // Get server wishlist
      const response = await api.get('/wishlist');
      const serverWishlist = response.data.data;

      if (serverWishlist && serverWishlist.products.length > 0) {
        // Merge local favorites with server wishlist
        const mergedFavorites = { ...favorites };

        serverWishlist.products.forEach(product => {
          if (!mergedFavorites[product._id]) {
            mergedFavorites[product._id] = product;
          }
        });

        setFavorites(mergedFavorites);
        localStorage.setItem('favorites', JSON.stringify(mergedFavorites));

        // Sync merged favorites back to server
        await syncLocalFavoritesToServer(mergedFavorites);
      } else if (Object.keys(favorites).length > 0) {
        // No server wishlist, but we have local favorites - sync to server
        await syncLocalFavoritesToServer(favorites);
      }

      setIsSynced(true);
    } catch (error) {
      console.error('Failed to sync favorites with database:', error);
      setIsSynced(true); // Don't retry indefinitely
    }
  };

  const syncLocalFavoritesToServer = async (favoritesObj) => {
    try {
      // Add each favorite to server wishlist
      for (const productId of Object.keys(favoritesObj)) {
        await api.post(`/wishlist/add/${productId}`);
      }
    } catch (error) {
      console.error('Failed to sync favorites to server:', error);
    }
  };

  const toggleFavorite = async (product) => {
    const wasFavorite = favorites[product._id];

    setFavorites(prevFavorites => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[product._id]) {
        delete newFavorites[product._id];
        // Show message for removal
        showToast(`${product.name} removed from favorites!`, 'info');
      } else {
        newFavorites[product._id] = product;
        // Show message for addition
        showToast(`${product.name} added to favorites!`, 'success');
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      try {
        if (wasFavorite) {
          // Remove from server
          await api.delete(`/wishlist/remove/${product._id}`);
        } else {
          // Add to server
          await api.post(`/wishlist/add/${product._id}`);
        }
      } catch (error) {
        console.error('Failed to sync favorite toggle with server:', error);
      }
    }
  };

  const isFavorite = (productId) => {
    return !!favorites[productId];
  };

  const favoritesCount = Object.keys(favorites).length;

  const showToast = (message, type = 'info') => {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-medium text-white shadow-lg transform translate-x-full transition-transform duration-300 ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};