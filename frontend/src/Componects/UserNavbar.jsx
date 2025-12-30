import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile_pic from "../assets/images/2.png";
import "../assets/styles/Navbar.css";
import Logo from "../assets/images/1.png";

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const UserNavbar = ({ setUserRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUserRole("");
    navigate("/login");
  };

  // 🔹 Fetch logged-in user profile
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${API_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogin = () => navigate("/login");

  const role = localStorage.getItem("role") || "";

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">

        {/* Logo */}
        <NavLink to="/" className="logo" end>
          <img src={Logo} alt="Logo" className="logo-img" />
        </NavLink>

        {/* Menu */}
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><NavLink to="/" className="nav-link" end>Home</NavLink></li>
            <li><NavLink to="/donate_blood" className="nav-link">Donate Blood</NavLink></li>
            <li><NavLink to="/request_blood" className="nav-link">Request Blood</NavLink></li>
            <li><NavLink to="/feedback" className="nav-link">Feedback</NavLink></li>
            <li><NavLink to="/aboutus" className="nav-link">About Us</NavLink></li>
            <li><NavLink to="/contactus" className="nav-link">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* User / Login */}
        {role === "user" ? (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src={Profile_pic} alt="User" className="user-img" />
            </button>

            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <span>{userInfo?.name}</span>
                  <span className="email">{userInfo?.email}</span>
                </div>

                <ul>
                  <li>
                    <NavLink
                      to="/profile"
                      state={{ userInfo }}
                      className="profile-link"
                    >
                      Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/history" className="profile-link">
                      History
                    </NavLink>
                  </li>

                  <li>
                    <button
                      className="profile-link logout-btn login-btn"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className="login-navbar-btn" onClick={handleLogin}>
            Sign In
          </button>
        )}

        {/* Mobile Menu */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
