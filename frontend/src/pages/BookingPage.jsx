import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const { state: hotel } = useLocation();
  const navigate = useNavigate();

  // Safeguards to prevent crashes if a user accesses this route directly
  const hasHotelData = hotel !== null && typeof hotel === "object";
  const hotelName = hasHotelData ? hotel.hotelName || hotel.name || "Selected Hotel" : "Selected Hotel";
  const hotelLocation = hasHotelData ? hotel.location || "Destination" : "Destination";
  const hotelPrice = hasHotelData ? hotel.price || "4200" : "4200";

  const [customerName, setCustomerName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  
  // Custom interface states to show inline feedback screens instead of alert popups
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!hasHotelData) {
      setErrorMessage("❌ Missing hotel reference data. Cannot proceed.");
      return;
    }

    setErrorMessage("");

    // Calculate travel nights between date inputs securely
    let nights = 1;
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const timeDifference = end.getTime() - start.getTime();
      const calculatedNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
      if (calculatedNights > 0) nights = calculatedNights;
    }

    // Format base rate to dynamic float calculation
    const parsedBasePrice = parseFloat(hotelPrice.toString().replace(/[^\d.]/g, "")) || 4200;
    const finalCalculatedTotal = parsedBasePrice * nights;

    // Schema payload configuration matching your Java fields
    const bookingPayload = {
      customerName: customerName,
      destination: hotelLocation,
      hotelName: hotelName,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfGuests: parseInt(numberOfGuests),
      totalAmount: finalCalculatedTotal
    };

    try {
      const savedToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: savedToken ? `Bearer ${savedToken}` : ""
        }
      };

      // Dispatch backend connection
      await axios.post("http://localhost:9096/api/bookings", bookingPayload, config);
      
      // 1. Show native success screen message inside card box
      setIsSuccess(true);

      // 2. Clear out state fields for safety
      const finalBookingState = {
        ...hotel,
        price: `₹ ${finalCalculatedTotal}`
      };

      // 3. Delayed routing transfers seamlessly to receipt view page
      setTimeout(() => {
        navigate("/booking-confirmed", {
          state: finalBookingState
        });
      }, 2500);

    } catch (error) {
      console.error("Payload Sync Network Error Log:", error.response || error);
      const backendMessage = error.response?.data?.message || error.message;
      setErrorMessage(`❌ Booking Failed: ${backendMessage}`);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://unsplash.com') no-repeat center center / cover",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        background: "#ffffff",
        padding: "40px 35px",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        boxSizing: "border-box"
      }}>
        {/* SUCCESS MESSAGE SCREEN OVERLAY VIEWPORT */}
        {isSuccess ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: "4.5rem", marginBottom: "20px", animation: "scaleUp 0.3s ease" }}>✅</div>
            <h2 style={{ color: "#16a34a", fontSize: "26px", fontWeight: "800", margin: "0 0 12px 0" }}>
              Booking Successful!
            </h2>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.5", margin: "0 0 10px 0" }}>
              Transaction written to MySQL table.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              Redirecting to confirmation invoice console...
            </p>
          </div>
        ) : (
          /* REGULAR FORM SCHEMATIC STRUCTURE WRAPPER */
          <form onSubmit={handleBooking}>
            <h2 style={{ textAlign: "center", margin: "0 0 25px 0", color: "#222222", fontSize: "28px", fontWeight: "800" }}>
              🏨 Complete Your Booking
            </h2>

            {/* Dynamic Hotel Details Card Fragment */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px", marginBottom: "25px" }}>
              <h4 style={{ margin: "0 0 6px 0", color: "#1e293b", fontSize: "18px", fontWeight: "700" }}>{hotelName}</h4>
              <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px", fontWeight: "500" }}>📍 {hotelLocation}</p>
              <p style={{ margin: "0", color: "#ff5a60", fontSize: "16px", fontWeight: "700" }}>₹ {hotelPrice} <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>/ night</span></p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#475569", fontSize: "14px", fontWeight: "600" }}>Full Name</label>
              <input type="text" placeholder="Enter traveler full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={inputStyle} />
            </div>

            <div style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#475569", fontSize: "14px", fontWeight: "600" }}>Check-In</label>
                <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "6px", color: "#475569", fontSize: "14px", fontWeight: "600" }}>Check-Out</label>
                <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#475569", fontSize: "14px", fontWeight: "600" }}>Number of Guests</label>
              <input type="number" min="1" max="10" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} required style={inputStyle} />
            </div>

            {/* INLINE ERROR DISPLAY FOR FAILURES */}
            {errorMessage && (
              <p style={{ color: "#ef4444", background: "#fef2f2", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", margin: "0 0 20px 0", border: "1px solid #fee2e2" }}>
                {errorMessage}
              </p>
            )}

            <button type="submit" style={{
              width: "100%", padding: "14px", background: "#ff5a60", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 15px rgba(255, 90, 96, 0.3)", transition: "transform 0.2s ease"
            }} onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
              Confirm 
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "11px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "15px", color: "#334155", outline: "none", boxSizing: "border-box", fontFamily: "inherit"
};

export default BookingPage;
