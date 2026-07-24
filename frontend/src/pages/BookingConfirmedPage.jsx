import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmedPage() {
  const { state: hotel } = useLocation();
  const navigate = useNavigate();
  const hasSaved = useRef(false); // Ref prevents duplicate network calls in React StrictMode

  const hasHotelData = hotel !== null && typeof hotel === "object";
  const hotelName = hasHotelData ? hotel.hotelName || hotel.name : "Your Booking";
  const hotelImage = hasHotelData ? hotel.imageUrl || hotel.image : "https://unsplash.com";
  const hotelLocation = hasHotelData ? hotel.location : "Destination Confirmed";
  const hotelPrice = hasHotelData ? hotel.price : "Paid Successfully";

  useEffect(() => {
    // Only save if data exists and hasn't been saved during this component mount cycle
    if (hasHotelData && !hasSaved.current) {
      hasSaved.current = true;

      const saveBookingToDatabase = async () => {
        try {
          await fetch("https://your-api-endpoint.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: `BK-${Date.now()}`,
              hotelName,
              location: hotelLocation,
              price: hotelPrice,
              bookingDate: new Date().toLocaleDateString(),
              status: "Confirmed"
            }),
          });
        } catch (error) {
          console.error("Failed to sync booking with server:", error);
        }
      };

      saveBookingToDatabase();
    }
  }, [hasHotelData, hotelName, hotelLocation, hotelPrice]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://unsplash.com') no-repeat center center / cover", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <div style={{ width: "90%", maxWidth: "550px", background: "#ffffff", borderRadius: "24px", padding: "45px 35px", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "10px" }}>✅</div>
        <h1 style={{ color: "#28a745", fontSize: "38px", margin: "0 0 20px 0", fontWeight: "800" }}>Booking Confirmed</h1>
        <img src={hotelImage} alt={hotelName} style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
        <h2 style={{ marginTop: "24px", color: "#1e293b", fontSize: "24px", fontWeight: "700" }}>{hotelName}</h2>
        <div style={{ margin: "15px 0", color: "#475569" }}>
          <h4 style={{ margin: "6px 0", fontSize: "16px", fontWeight: "600" }}>📍 {hotelLocation}</h4>
          <h4 style={{ margin: "6px 0", fontSize: "18px", color: "#ff5a5f", fontWeight: "700" }}> {hotelPrice}</h4>
        </div>
        <button onClick={() => navigate("/home")} style={{ marginTop: "30px", padding: "14px 40px", background: "#ff5a5f", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", width: "100%" }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmedPage;
