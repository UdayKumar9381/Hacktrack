import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./organiserAuth.css";

const OrganiserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5002/api/hoster/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/Hosting");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="organiser-container">
      <div className="organiser-title-box">Organiser Login</div>

      <form onSubmit={handleLogin} className="organiser-login-form">
        <div className="organiser-input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="organiser-input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="organiser-form-options">
          <label className="organiser-checkbox-container">
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <span className="organiser-checkmark"></span> Remember Me
          </label>
          <span className="organiser-forgot-password">Forgot Password?</span>
        </div>

        <button type="submit" className="organiser-login-btn">Login</button>
      </form>

      <p className="organiser-signup-text">
        Don't have an account? <span className="organiser-signup-link" onClick={() => navigate("/organisersignup")}>Signup here</span>
      </p>

      {error && <p className="organiser-error">{error}</p>}
    </div>
  );
};

export default OrganiserLogin;
