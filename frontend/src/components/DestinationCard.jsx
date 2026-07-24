import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../services/favoriteService";

// Added initialIsFavorited prop so the heart stays red if already favorited
function DestinationCard({ destination, initialIsFavorited = false }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [saving, setSaving] = useState(false);

  const handleAddFavorite = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Please log in to save favorites.");
      return;
    }

    setSaving(true);

    const favoritePayload = {
      userId: user.id,
      itemId: destination.id,
      itemType: "destination",
      placeName: destination.placeName,
      imageUrl: destination.imageUrl,
      category: destination.category || "Destination",
      description: destination.description,
    };

    addFavorite(favoritePayload)
      .then(() => setIsFavorited(true))
      .catch(() => alert("Could not add to favorites. Please try again."))
      .finally(() => setSaving(false));
  };

  return (
    <div className="destination-card">
      <div className="destination-image-wrapper">
        <img
          className="destination-image"
          src={destination.imageUrl}
          alt={destination.placeName}
        />
        <button
          className="favorite-heart-btn"
          onClick={handleAddFavorite}
          disabled={saving || isFavorited}
          title={isFavorited ? "Added to favorites" : "Add to favorites"}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="destination-content">
        <h2>{destination.placeName}</h2>
        <p>{destination.description}</p>

        <button
          className="details-btn"
          onClick={() =>
            navigate(`/destination/${destination.id}`, { state: destination })
          }
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default DestinationCard;
