import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import AllProducts from "./components/AllProducts";
import AllFlashSales from "./components/AllFlashSales";
import AllBestSellers from "./components/AllBestSellers";
import Wishlist from "./components/wishlist";
import ProductDetail from "./components/ProductDetail";
import CategoryDetail from "./components/CategoryDetail";
import CategoryProducts from "./components/CategoryProducts";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="App font-sans text-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/flash-sales" element={<AllFlashSales />} />
              <Route path="/best-sellers" element={<AllBestSellers />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/category/:id" element={<CategoryDetail />} />
              <Route path="/categories/:categoryId/products" element={<CategoryProducts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

            </Routes>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
