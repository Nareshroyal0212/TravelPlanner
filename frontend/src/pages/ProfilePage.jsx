import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // SECURITY GUARD CHECK: If session trace returns empty, block page tracking instantly
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevents layout engine flickering while the redirect fires
  }

  const name = user.fullName || user.place_name || user.username || "Traveler Profile";
  const email = user.email || "Hidden Security Account";

  // FIX: Extract the first character of the username dynamically for the initial letter badge icon
  const initialLetter = name.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
        <div style={{ width: "420px", background: "#fff", padding: "40px", borderRadius: "24px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          
          {/* FIX: Dynamic Circular Initial Letter Icon Canvas */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div 
              style={{ 
                width: "100px", 
                height: "100px", 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, #ff5a5f, #ff7e82)", 
                color: "#ffffff", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "42px", 
                fontWeight: "700",
                boxShadow: "0 8px 16px rgba(255, 90, 95, 0.2)",
                userSelect: "none"
              }}
            >
              {initialLetter}
            </div>
          </div>

          <h2 style={{ fontSize: "26px", color: "#0f172a", margin: "10px 0 5px" }}>{name}</h2>
          <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "20px" }}>✉️ {email}</p>
          <div style={{ display: "inline-block", background: "#ff5a5f", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontWeight: "600", fontSize: "14px" }}>
            Verified Account
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
