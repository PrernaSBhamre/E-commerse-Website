import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App font-sans text-black">
      <Navbar />
      <Hero />

      
    </div>
  );
}

export default App;
