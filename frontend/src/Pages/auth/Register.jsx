import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/auth_styles/Login.css";
import { NavLink } from "react-router-dom";

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bloodgroup: "",
    dob: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.location.trim()) newErrors.location = "Address is required.";

    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (age < 18 || (age === 18 && m < 0)) {
        newErrors.dob = "You must be at least 18 years old.";
      }
    }

    if (!formData.bloodgroup) newErrors.bloodgroup = "Blood group is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/auth/register`,
        {
          ...formData,
          role: "user"
        }
      );

      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>

      <div className="login-form">
        <h2 className="Login-titel">
          <strong>Register</strong>
        </h2>

        <form onSubmit={handleRegister}>
          <div className="left-group">
            <div className="input-group">
              <label className="Input-Name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label className="Input-Name">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label className="Input-Name">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="right-group">
            <div className="input-group">
              <label className="Input-Name">Address</label>
              <input
                type="text"
                name="location"
                placeholder="Enter your address"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>

            <div className="input-group">
              <label className="Input-Name">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>

            <div className="input-group">
              <label className="Input-Name">Blood Group</label>
              <select
                name="bloodgroup"
                value={formData.bloodgroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodgroup && (
                <span className="error">{errors.bloodgroup}</span>
              )}
            </div>

            <div className="input-group">
              <label className="Input-Name">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <span className="login-titel">
            Have an account?
            <NavLink to="/login" className="login-link">
              {" "}Log in now
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
