import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import DestinationCard from "../components/DestinationCard";
import "../styles/destination.css";
import { getAllDestinations } from "../services/destinationService";

function DestinationsPage() {
  const [searchText, setSearchText] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load destinations from the database instead of a hardcoded list
  useEffect(() => {
    getAllDestinations()
      .then((res) => {
        setDestinations(res.data);
        setError("");
      })
      .catch(() => {
        setError("Could not load destinations. Is the backend running?");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.placeName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="destinations-page">
        <section className="destinations-header">
          <p>EXPLORE THE WORLD</p>
          <h1>Discover Your Next Destination</h1>
          <span>Find beautiful places and start planning your next adventure.</span>
        </section>

        <section className="destination-search-section">
          <div className="destination-search-box">
            <input
              type="text"
              placeholder="Search destination..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button>🔍 Search</button>
          </div>
        </section>

        <section className="destination-list-section">
          <div className="destination-results-header">
            <h2>Popular Destinations</h2>
            <p>{filteredDestinations.length} Destinations Found</p>
          </div>

          {error && <p className="error-text">{error}</p>}

          {loading ? (
            <p>Loading destinations...</p>
          ) : filteredDestinations.length === 0 ? (
            <div className="no-results">
              <h2>No Destinations Found</h2>
            </div>
          ) : (
            <div className="destination-page-grid">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default DestinationsPage;
