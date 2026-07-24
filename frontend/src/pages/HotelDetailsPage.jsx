import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/hotelDetails.css";

function HotelDetailsPage() {
  const { state: hotel } = useLocation();
  const navigate = useNavigate();

  if (!hotel) {
    return <h2 style={{ textAlign: "center", padding: "50px", color: "#334155" }}>Hotel Not Found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="hotel-details-page">

        <div className="hotel-banner">
          <img
            src={hotel.imageUrl}
            alt={hotel.hotelName}
          />
        </div>

        <div className="hotel-card-details">

          <div className="hotel-header">
            <div>
              <h1>{hotel.hotelName}</h1>
              <p>📍 {hotel.location}</p>
            </div>

            <div className="rating-box">
              ⭐ {hotel.rating}
            </div>
          </div>

          <h2 className="price">
            ₹ {hotel.price} <span>/ Night</span>
          </h2>

          <p className="description">
            Enjoy a luxurious stay with spacious rooms,
            free WiFi, swimming pool, restaurant,
            spa, fitness centre and 24×7 room service.
            Perfect for family vacations and business trips.
          </p>

          <div className="facility-grid">
            <div>🏊 Swimming Pool</div>
            <div>📶 Free WiFi</div>
            <div>🍽 Restaurant</div>
            <div>🚗 Free Parking</div>
            <div>🛏 Luxury Rooms</div>
            <div>🛎 Room Service</div>
            <div>☕ Free Breakfast</div>
            <div>🏋 Gym</div>
          </div>

          {/* THE ENTIRE INPUT BOX AND LABELS ARE GONE FOREVER FROM THIS RUNTIME LAYER */}

          <button
            className="confirm-booking-btn"
            onClick={() =>
              navigate("/booking", {
                state: hotel
              })
            }
            style={{ 
              marginTop: "45px", // Added clean top margin distribution separating the amenities grid layout from the checkout action directly
              width: "100%"
            }} 
          >
            Confirm Booking
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default HotelDetailsPage;
