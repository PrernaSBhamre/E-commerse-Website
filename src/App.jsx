import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FlashSales from "./components/FlashSales";
import Categories from "./components/Categories";
import BestSelling from "./components/BestSelling";
import MusicSpeaker from "./components/MusicSpeaker";
import ExploreProducts from "./components/ExploreProducts";
import NewArrival from "./components/NewArrival";
import Service from "./components/Service";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App font-sans text-black">
      <Navbar />
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <MusicSpeaker />
      <ExploreProducts />
      <NewArrival />
      <Service />
      <Footer />
    </div>
  );
}

export default App;
