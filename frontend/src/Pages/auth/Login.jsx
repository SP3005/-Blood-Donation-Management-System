import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid Email: Enter correct Email";
    }

    if (password.length < 6) {
      newErrors.password = "Invalid Password: Enter correct Password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      const { token, role } = response.data;

      if (!role) {
        setServerError("Login failed: Role is missing");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setUserRole(role);

      if (role === "admin") {
        navigate("/admin_dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Login failed. Please try again.";
      setServerError(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>

      <div className="login-form">
        <h2 className="Login-titel">
          <strong>Login</strong>
        </h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="Input-Name">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label className="Input-Name">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          {serverError && (
            <span className="error">{serverError}</span>
          )}

          <span className="register-titel">
            <NavLink to="/forgot-password" className="register-link">
              Forgot Password?
            </NavLink>
          </span>

          <button type="submit" className="login-btn">
            Login
          </button>

          <span className="register-titel">
            Don't have an account?
            <NavLink to="/register" className="register-link">
              {" "}Sign Up
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
