import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const admins = [
      { email: "mythili@gmail.com", password: "mythili123", fullName: "Mythili" },
      { email: "naresh@gmail.com", password: "naresh123", fullName: "Naresh" },
      { email: "pavan@gmail.com", password: "pavan123", fullName: "Pavan" },
      { email: "neerja@gmail.com", password: "neerja123", fullName: "Neerja" },
      { email: "najma@gmail.com", password: "najma123", fullName: "Najma" },
      { email: "hema@gmail.com", password: "hema123", fullName: "Hema" }
    ];

    const validAdmin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (validAdmin) {
      // **Final Fix Answer**: Save the name string under all possible formatting keys to guarantee cross-component rendering
      localStorage.setItem("user", JSON.stringify({
        fullName: validAdmin.fullName,
        full_name: validAdmin.fullName,
        username: validAdmin.fullName,
        email: validAdmin.email,
        role: "ADMIN"
      }));

      setMessage("✅ Login Successful! Redirecting...");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 800);
    } else {
      setMessage("❌ Invalid Admin Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🛡 Admin Login</h1>
        <p>Travel Planner Administration</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {message && (
          <h3 className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
          </h3>
        )}
      </div>
    </div>
  );
}

export default AdminLoginPage;
