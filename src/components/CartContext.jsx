import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isSynced, setIsSynced] = useState(false);

    // Sync cart with database when user logs in
    useEffect(() => {
        if (isAuthenticated && user && !isSynced) {
            syncCartWithDatabase();
        }
    }, [isAuthenticated, user, isSynced]);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const syncCartWithDatabase = async () => {
        try {
            // Get server cart
            const response = await api.get('/cart');
            const serverCart = response.data.data;

            if (serverCart && serverCart.products.length > 0) {
                // Merge local cart with server cart
                const mergedCart = [...cartItems];

                serverCart.products.forEach(serverItem => {
                    const existingLocal = mergedCart.find(item => item._id === serverItem.product._id);
                    if (existingLocal) {
                        // Update quantity if server has more
                        existingLocal.quantity = Math.max(existingLocal.quantity, serverItem.quantity);
                    } else {
                        // Add server item to local cart
                        mergedCart.push({
                            ...serverItem.product,
                            quantity: serverItem.quantity
                        });
                    }
                });

                setCartItems(mergedCart);

                // Sync merged cart back to server
                await syncLocalCartToServer(mergedCart);
            } else if (cartItems.length > 0) {
                // No server cart, but we have local cart - sync to server
                await syncLocalCartToServer(cartItems);
            }

            setIsSynced(true);
        } catch (error) {
            console.error('Failed to sync cart with database:', error);
            setIsSynced(true); // Don't retry indefinitely
        }
    };

    const syncLocalCartToServer = async (items) => {
        try {
            // Clear server cart first
            await api.delete('/cart/clear');

            // Add each item to server cart
            for (const item of items) {
                await api.post('/cart/add', {
                    productId: item._id,
                    quantity: item.quantity
                });
            }
        } catch (error) {
            console.error('Failed to sync cart to server:', error);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });

        // Sync with server if authenticated
        if (isAuthenticated) {
            try {
                await api.post('/cart/add', {
                    productId: product._id,
                    quantity
                });
            } catch (error) {
                console.error('Failed to sync add to cart with server:', error);
            }
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );

        // Sync with server if authenticated
        if (isAuthenticated) {
            try {
                await api.put(`/cart/update/${productId}`, { quantity });
            } catch (error) {
                console.error('Failed to sync quantity update with server:', error);
            }
        }
    };

    const removeFromCart = async (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));

        // Sync with server if authenticated
        if (isAuthenticated) {
            try {
                await api.delete(`/cart/remove/${productId}`);
            } catch (error) {
                console.error('Failed to sync remove from cart with server:', error);
            }
        }
    };

    const clearCart = async () => {
        setCartItems([]);

        // Sync with server if authenticated
        if (isAuthenticated) {
            try {
                await api.delete('/cart/clear');
            } catch (error) {
                console.error('Failed to sync clear cart with server:', error);
            }
        }
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
