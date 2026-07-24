import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/favorites.css";
import {
  getFavorites,
  deleteFavorite,
} from "../services/favoriteService";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFavorites = useCallback(() => {
    setLoading(true);
    getFavorites()
      .then((res) => {
        setFavorites(res.data || []);
        setError("");
      })
      .catch(() => {
        setError("Could not connect to the backend API. Check if your Spring Boot app is running on port 9096.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const removeFavorite = (id) => {
    deleteFavorite(id)
      .then(() => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        setError("Could not delete item.");
      });
  };

  return (
    <>
      <Navbar />

      <div className="favorites-page">
        <div className="favorites-header">
          <p>YOUR COLLECTION</p>
          <h1>Favorite Places ❤️</h1>
          <span>Save your dream destinations and plan your next trip.</span>
        </div>

        {error && <p className="error-text" style={{ textAlign: "center", color: "#ff5a5f", margin: "10px 0" }}>{error}</p>}

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px" }}>Loading favorites collection...</p>
        ) : favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2>No Favorite Places</h2>
            <p>Add places to your favorites layout canvas.</p>
          </div>
        ) : (
          <div className="favorite-grid">
            {favorites.map((place) => {
              const currentName = place.placeName || place.place_name || "Scenic Destination";

              // FIX: read the real image field instead of description
              const currentImg = place.imageUrl || place.image_url;

              // FIX: fallback map now uses real, direct image URLs instead of "https://unsplash.com"
              const fallbackImages = {
                "Goa": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800",
                "Manali": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                "Jaipur": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
                "Kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
                "Maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
                "Burj Al Arab": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
                "Taj Exotica Resort & Spa": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
              };

              const validImgSrc = currentImg && currentImg.startsWith("http")
                ? currentImg
                : (fallbackImages[currentName] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800");

              return (
                <div className="favorite-card" key={place.id}>
                  <img
                    src={validImgSrc}
                    alt={currentName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800";
                    }}
                  />

                  <div className="favorite-content">
                    <h2>{currentName}</h2>
                    <p>📍 {place.category || "General Destination"}</p>

                    <button onClick={() => removeFavorite(place.id)}>
                      Remove ❤️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default FavoritesPage;