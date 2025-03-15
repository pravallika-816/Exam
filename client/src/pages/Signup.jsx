import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Signup successful! (No backend connection)");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw", 
        backgroundColor: "#FFFDD0",
     }}
    >
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "400px", 
        maxWidth: "90%", 
      }}
    >

        <h2 style={{ color: "#B7410E", marginBottom: "1rem" }}>Signup</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#B7410E",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}
          >
            Signup
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Existing user?{" "}
          <Link
            to="/login"
            style={{
              color: "#B7410E",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
