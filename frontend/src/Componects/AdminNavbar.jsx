import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/Admin_styles/AdminNavbar.css";
import { NavLink } from "react-router-dom";
import Profile_pic  from "../assets/images/2.png";
import Logo  from "../assets/images/1.png";

const Navbar = ({setUserRole}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [userInfo, setUserInfo] = useState(null);
    const dropdownRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("authToken");
    setUserRole("");  // State update karein
    window.location.href = "/"; // Page reload karke login pe le jaye
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
      <div className="admin-container">
        <NavLink to="/admin_dashboard" className="admin-logo" end>
          <img
            src={Logo}
            alt="Logo"
            className="admin-logo-img"
          />
        </NavLink>

        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <ul className="admin-ul">
            <li>
              <NavLink 
                to="/admin_dashboard" 
                className="nav-link" 
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blood_stock" 
                className="nav-link"
              >
                Blood Stock Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/donation_requests" 
                className="nav-link"
              >
                Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/patient_response" 
                className="nav-link"
              >
                Patient Response 
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/feedback_management" 
                className="nav-link"
              >
                Feedback Management
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user-menu">
          <button
            className="user-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={Profile_pic}
              alt="User"
              className="user-img"
            />
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
                {/* <li>
                  <NavLink 
                    to="/adminhistory" 
                    className="profile-link"
                  >
                    History
                  </NavLink>
                </li> */}
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

export default Navbar;

