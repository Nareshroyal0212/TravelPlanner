import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HotelCard from "../components/HotelCard";
import "../styles/hotel.css";
import { getAllHotels } from "../services/hotelService";

function HotelsPage() {
  const [searchText, setSearchText] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load hotels from the database instead of a hardcoded list
  useEffect(() => {
    getAllHotels()
      .then((res) => {
        setHotels(res.data);
        setError("");
      })
      .catch(() => {
        setError("Could not load hotels. Is the backend running?");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.hotelName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="hotel-page">
        <div className="hotel-header">
          <p>LUXURY STAY</p>
          <h1>Find Your Perfect Hotel</h1>
          <span>Book comfortable hotels at your favorite destinations.</span>
        </div>

        <div className="hotel-search-box">
          <input
            type="text"
            placeholder="Search Hotel..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>🔍 Search</button>
        </div>

        <div className="hotel-results">
          <h2>Popular Hotels</h2>
          <p>{filteredHotels.length} Hotels Found</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        {loading ? (
          <p>Loading hotels...</p>
        ) : (
          <div className="hotel-grid">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default HotelsPage;
