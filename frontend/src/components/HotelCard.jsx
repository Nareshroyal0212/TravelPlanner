import React from "react";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <div className="hotel-card">
      <img
        src={hotel.imageUrl}
        alt={hotel.hotelName}
        className="hotel-image"
      />

      <div className="hotel-content">
        <h2>{hotel.hotelName}</h2>
        <p>📍 {hotel.location}</p>
        <p>⭐ {hotel.rating}</p>
        <h3>₹ {hotel.price} / Night</h3>

        <button
          className="book-btn"
          onClick={() =>
            navigate(`/hotel/${hotel.id}`, {
              state: hotel,
            })
          }
        >
          Book Hotel
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
