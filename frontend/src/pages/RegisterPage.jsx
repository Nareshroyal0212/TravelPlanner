import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/register.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      setMessage("Please fill all details");
      return;
    }

    try {
      // 1. Submit form parameters straight to your Spring Boot REST API
      await api.post("/auth/register", {
        fullName: name,
        email: email,
        password: password,
        role: role
      });

      // 2. FIX: Display success message and prompt them to authenticate manually
      setMessage("✅ Registration Successful! Redirecting to login...");

      setTimeout(() => {
        // 3. FIX: Send them back to the login sheet instead of dropping a raw token payload
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);
      const backendMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : null);

      setMessage(backendMessage ? `❌ ${backendMessage}` : "❌ Registration Failed.");
    }
  };


  return (
    <div className="register-page">
      {/* Left Side */}
      <div className="register-left">
        <h1>✈ Travel Planner</h1>
        <h2>Explore Every Journey</h2>
        <p>Plan your perfect vacation with our smart travel planner.</p>

        <div className="feature-list">
          <p>🌍 Search Destinations</p>
          <p>🏨 Hotel Booking</p>
          <p>☀ Live Weather</p>
          <p>💰 Budget Calculator</p>
          <p>❤️ Favorite Places</p>
          <p>🗺 Smart Itinerary</p>
        </div>
      </div>

      {/* Register Card */}
      <div className="register-card">
        <h1>Create Account ✈️</h1>
        <p>Join Travel Planner</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Select Account Type</label>
          <div className="role-box">
            {/* 4. FIX: Dynamic background color highlight indicates selected role button item state */}
            <button
              type="button"
              onClick={() => setRole("USER")}
              style={{
                background: role === "USER" ? "#ff5a5f" : "#fff",
                color: role === "USER" ? "#fff" : "#333",
                border: "1px solid #ff5a5f",
                transition: "0.2s ease"
              }}
            >
              {role === "USER" ? "👤 User ✓" : "👤 User"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin-login")}
            >
              ⚙️ Admin
            </button>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        {message && <h3 className="message">{message}</h3>}

        <p>
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#ff5a5f",
              cursor: "pointer",
              marginLeft: "8px",
              fontWeight: "bold"
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
