import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import AllProducts from "./components/AllProducts";
import AllFlashSales from "./components/AllFlashSales";
import AllBestSellers from "./components/AllBestSellers";
import ProductDetail from "./components/ProductDetail";
import CategoryDetail from "./components/CategoryDetail";
import CategoryProducts from "./components/CategoryProducts";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App font-sans text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/flash-sales" element={<AllFlashSales />} />
        <Route path="/best-sellers" element={<AllBestSellers />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/categories/:categoryId/products" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
