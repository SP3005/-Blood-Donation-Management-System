import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile_pic from "../assets/images/2.png";
import "../assets/styles/Navbar.css";
import Logo from "../assets/images/1.png"

const UserNavbar = ({ setUserRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUserRole("");  // Update state
    navigate("/login"); // Redirect to Login page
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        const data = await response.json();
        console.log(data);

        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  }

  const role = localStorage.getItem("role") || "";
  console.log("Updated Role:", role);
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
        <NavLink to="/" className="logo" end>
          <img src={Logo} alt="Logo" className="logo-img" />
        </NavLink>

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

        {role === "user" ?
          <div className="user-menu">
            <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
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
                      to={{
                        pathname: "/profile",
                      }}
                      state={{ userInfo }}
                      className="profile-link"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li><NavLink to="/history" className="profile-link">History</NavLink></li>
                  <li>
                    <button className="profile-link logout-btn login-btn" onClick={handleLogout}>Sign out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          : <button className="login-navbar-btn" onClick={handleLogin}>Sign In</button>
        }
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
    </nav>
  );
};

export default UserNavbar;
