import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* Render Navbar */}
      <Navbar />

      {/* Other content */}
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome to My E-Commerce Site</h1>
        <p className="mt-4">Start shopping from our amazing collection!</p>
      </main>
    </div>
  );
}

export default App;
