import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FlashSales from "./components/FlashSales";
import AllFlashSales from "./components/AllFlashSales";
import AllBestSellers from "./components/AllBestSellers";
import AllProducts from "./components/AllProducts";
import Categories from "./components/Categories";
import BestSelling from "./components/BestSelling";
import MusicSpeaker from "./components/MusicSpeaker";
import ExploreProducts from "./components/ExploreProducts";
import NewArrival from "./components/NewArrival";
import Service from "./components/Service";
import Footer from "./components/Footer";
import CategoryProducts from "./components/CategoryProducts";

function App() {
  return (
    <div className="App font-sans text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <FlashSales />
            <Categories />
            <BestSelling />
            <MusicSpeaker />
            <ExploreProducts />
            <NewArrival />
            <Service />
          </>
        } />
        <Route path="/flash-sales" element={<AllFlashSales />} />
        <Route path="/best-sellers" element={<AllBestSellers />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/categories/:categoryId/products" element={<CategoryProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
