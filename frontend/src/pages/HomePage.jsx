import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/home.css";

function HomePage() {
  return (
    <>
      <div className="hero">
        <Navbar />

        <div className="overlay"></div>

        <div className="hero-content">
          <h1>
            TRAVELLING <br />
            AROUND THE WORLD
          </h1>

          <p>
            Discover amazing destinations, book hotels,
            check weather, calculate your budget and
            generate your travel itinerary.
          </p>

        
        </div>

        {/* Removed <SearchBox /> from here */}
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
