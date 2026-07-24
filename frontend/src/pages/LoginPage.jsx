import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import api from "../services/api";
import "../styles/login.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      const loginPayload = response.data;
      
      // 1. Extract the JWT token cleanly whether flat or nested inside a user object
      const activeToken = loginPayload.token || loginPayload.jwt || loginPayload.user?.token || loginPayload.user?.jwt;
      if (activeToken) {
        localStorage.setItem("token", activeToken);
      }

      // 2. Extract and preserve the user profile layout safely
      const userDataToSave = loginPayload.user ? loginPayload.user : loginPayload;
      localStorage.setItem("user", JSON.stringify(userDataToSave));

      setMessage("✅ Login Successful");

      // 3. Extract user permissions security role securely
      const userRole = 
        loginPayload.role || 
        loginPayload.roleGroup || 
        loginPayload.user?.role || 
        "USER";

      setTimeout(() => {
        if (userRole === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      }, 1000);

    } catch (error) {
      console.error("Login request breakdown:", error);
      setMessage("❌ Invalid Email or Password");
    }
  };

  const forgotPassword = () => {
    setMessage("📧 Password reset link sent to your email");
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            ✈️
          </div>

          <h1>Welcome Back</h1>
          <p className="subtitle">
            Login to continue your travel journey
          </p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                {showPassword ? "👁️" : "🔒"}
              </span>
            </div>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {message && (
            <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
              {message}
            </p>
          )}

         

          <p className="signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#ff5a60", fontWeight: "bold" }}>
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginPage;
