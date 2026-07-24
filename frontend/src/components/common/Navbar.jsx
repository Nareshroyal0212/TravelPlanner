import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Safely read and parse local storage data on initial mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user session data:", error);
      localStorage.removeItem("user"); // Clean up corrupt data
    }
  }, []);

  // Resolve the user's name dynamically using fallbacks
  const displayName = user?.fullName || user?.full_name || user?.username || "PROFILE";

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear state instantly to trigger a re-render
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
        ✈ Travel Planner
      </div>

      <ul className="nav-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/destinations">DESTINATIONS</Link></li>
        <li><Link to="/hotels">HOTELS</Link></li>
        <li><Link to="/budget">BUDGET</Link></li>
        <li><Link to="/weather">WEATHER</Link></li>
        <li><Link to="/favorites">FAVORITES</Link></li>
        <li><Link to="/itinerary">ITINERARY</Link></li>

        {!user ? (
          <li>
            <Link to="/login" className="login-nav-link">LOGIN</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/profile" className="profile-nav-link">
                👤 {displayName}
              </Link>
            </li>
            <li>
              <button onClick={logout} className="logout-btn">
                LOGOUT
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
