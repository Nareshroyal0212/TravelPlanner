import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  
  // Dynamic session profiles lookup
  const adminUser = JSON.parse(localStorage.getItem("user"));
  const adminDisplayName = adminUser?.fullName || adminUser?.full_name || adminUser?.username || "Admin";

  // Navigation panel view selector states
  const [activeTab, setActiveTab] = useState("users"); 
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  const [showWelcome, setShowWelcome] = useState(true);


  // Fetch data dynamically on tab context change
  const fetchData = () => {
    setLoading(true);
    setError("");
    
    if (activeTab === "users") {
      api.get("/auth/admin/users")
        .then((res) => setUsers(res.data || []))
        .catch(() => setError("❌ Failed to query active registered users ledger."))
        .finally(() => setLoading(false));
    } else {
      api.get("/favorites/admin/all")
        .then((res) => setPlans(res.data || []))
        .catch(() => setError("❌ Failed to query global travel plans itineraries."))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Secure deletion method to drop user entries from your MySQL table instantly
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("⚠️ Are you sure you want to permanently delete this user account?")) {
      return;
    }

    try {
      await api.delete(`/auth/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete user from server. Please try again.");
    }
  };

  // Secure deletion method to drop user travel plans from your database
  const handleDeletePlan = async (planId) => {
    if (!window.confirm("⚠️ Remove this travel destination from the public registry logs?")) {
      return;
    }

    try {
      await api.delete(`/favorites/${planId}`);
      setPlans((prevPlans) => prevPlans.filter((p) => p.id !== planId));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete travel plan from server. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Inline style object for delete button state management
  const deleteBtnStyle = {
    background: "#fee2e2",
    color: "#ef4444",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s"
  };

      // 1. IF THE OVERLAY IS ACTIVE, ONLY SHOW THE WELCOME SCREEN
    // 1. IF THE OVERLAY IS ACTIVE, ONLY SHOW THE ATTRACTIVE GLASSMORPHISM WELCOME SCREEN
   // 1. SHOW THE WELCOME SCREEN MATCHING THE LOGIN PAGE BACKGROUND
   // 1. IF THE OVERLAY IS ACTIVE, ONLY SHOW THE CANYON WELCOME SCREEN OVERLAY
  if (showWelcome) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://unsplash.com') no-repeat center center / cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}>
        <div style={{
          background: "#ffffff",
          padding: "45px 35px",
          borderRadius: "24px",
          width: "90%",
          maxWidth: "480px",
          textAlign: "center",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "15px" }}>🛡️</div>
          <h2 style={{
            color: "#ff5a60",
            fontSize: "1.3rem",
            textTransform: "capitalize",
            letterSpacing: "0.5px",
            margin: "0 0 8px 0",
            fontWeight: "700"
          }}>
            Welcome Back!
          </h2>
          <h1 style={{
            color: "#222222",
            fontSize: "2.4rem",
            margin: "0 0 20px 0",
            fontWeight: "800",
            letterSpacing: "-0.5px"
          }}>
            {adminDisplayName}
          </h1>
          <p style={{
            color: "#484848",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            margin: "0 0 35px 0",
            fontWeight: "500"
          }}>
            The Travel Planner ecosystem is active and awaiting your orders. 
            Review system metrics, manage global itineraries, and oversee user registrations seamlessly.
          </p>
          <button 
            onClick={() => setShowWelcome(false)}
            style={{
              background: "#ff5a60",
              color: "#ffffff",
              border: "none",
              fontSize: "1.05rem",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(255, 90, 96, 0.3)",
              width: "100%",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Enter Control Console 🚀
          </button>
        </div>
      </div>
    );
  } // <-- NOTE: Closed the if-block properly here. Component continues below!

  // 2. ONCE THE BUTTON IS CLICKED, RENDER THE ACTUAL ADMIN DASHBOARD PANEL
  return (
    <div className="premium-admin-layout">
      {/* SIDEBAR NAVIGATION CONTROL MODULE PANEL */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          ✈️ Travel<span>Planner</span>
        </div>

        <div className="sidebar-menu">
          <button 
            className={`sidebar-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Registered Users
          </button>
          
          <button 
            className={`sidebar-btn ${activeTab === "plans" ? "active" : ""}`}
            onClick={() => setActiveTab("plans")}
          >
            🗺️ Global Travel Plans
          </button>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            🚪 Exit Console
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT LAYOUT CANVAS */}
      <main className="admin-main-view">
        
        <header className="admin-view-header">
          <div className="admin-welcome-meta">
            <h1>🛡️ {adminDisplayName}</h1>
            <p>Travel Planner Ecosystem Control & Monitoring Center</p>
          </div>
        </header>

        {/* Top Metric Summary Cards */}
        <section className="premium-metrics-grid">
          <div className="metric-neon-card">
            <div className="metric-info-box">
              <p>Total Travelers</p>
              <h3>{users ? users.length : "0"}</h3>
            </div>
            <div className="metric-icon-bubble" style={{ background: "#e0f2fe", color: "#0284c7" }}>👥</div>
          </div>

          <div className="metric-neon-card">
            <div className="metric-info-box">
              <p>Active Itineraries</p>
              <h3>{plans ? plans.length : "0"}</h3>
            </div>
            <div className="metric-icon-bubble" style={{ background: "#fef3c7", color: "#d97706" }}>🗺️</div>
          </div>

          <div className="metric-neon-card">
            <div className="metric-info-box">
              <p>System Status</p>
              <h3 style={{ color: "#16a34a", fontSize: "20px" }}>Online ✓</h3>
            </div>
            <div className="metric-icon-bubble" style={{ background: "#dcfce7", color: "#166534" }}>⚙️</div>
          </div>
        </section>

        {error && <p style={{ color: "#ef4444", padding: "10px", fontWeight: "600" }}>{error}</p>}

        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>Syncing database ledger records...</p>
        ) : (
          <div className="premium-table-wrapper">
            {activeTab === "users" ? (
              <>
                <div className="table-header-block">
                  <h2>Registered System Users</h2>
                </div>
                <table className="premium-data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Avatar</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Role Tier</th>
                      <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? users.map((u) => (
                      <tr key={u.id}>
                        <td>#{u.id}</td>
                        <td>
                          <div className="avatar-circle">
                            {(u.fullName || u.full_name || "U").charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td style={{ fontWeight: "600", color: "#0f172a" }}>
                          {u.fullName || u.full_name || "Traveler Account"}
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge-pill ${u.role === "ADMIN" ? "admin" : "user"}`}>
                            {u.role || "USER"}
                          </span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            style={deleteBtnStyle}
                            onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#ffffff"; }}
                            onMouseLeave={(e) => { e.target.style.background = "#fee2e2"; e.target.style.color = "#ef4444"; }}
                          >
                            Delete 🗑️
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" style={{ textAlign: "center", color: "#94a3b8" }}>No records present in user database.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className="table-header-block">
                  <h2>Global User Travel Plans</h2>
                </div>
                <table className="premium-data-table">
                  <thead>
                    <tr>
                      <th>Plan ID</th>
                      <th>Destination</th>
                      <th>User ID</th>
                      <th>Created Date</th>
                      <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans && plans.length > 0 ? plans.map((p) => (
                      <tr key={p.id}>
                        <td>#{p.id}</td>
                        <td style={{ fontWeight: "600", color: "#0f172a" }}>
                          {p.destination || p.title || "Unnamed Itinerary"}
                        </td>
                        <td>#{p.userId || p.user_id || "N/A"}</td>
                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}</td>
                        <td style={{ textAlign: "center" }}>
                          <button 
                            onClick={() => handleDeletePlan(p.id)}
                            style={deleteBtnStyle}
                            onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#ffffff"; }}
                            onMouseLeave={(e) => { e.target.style.background = "#fee2e2"; e.target.style.color = "#ef4444"; }}
                          >
                            Remove 🗑️
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" style={{ textAlign: "center", color: "#94a3b8" }}>No travel plans found in registry.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default AdminDashboard;