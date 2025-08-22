import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componects/Navbar";
import Home from "../src/Pages/Home/Home";
import Donate_Blood from "../src/Pages/Home/Donate_Blood";
import Request_Blood from "./Pages/Home/Request_Blood";
import AboutUs from "./Pages/Home/AboutUS";
import ContactUs from "./Pages/Home/ContactUS";
import Profile from "./Pages/Home/Profile";
import History from "./Pages/Home/History";
import Logout from "./Pages/Home/Logout";
import Feedback from "./Pages/Home/Feedback";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminProfile from "./Pages/admin/AdminProfile";
import BloodStock from "./Pages/admin/BloodStock";
import DonationRequests from "./Pages/admin/DonationRequests";
import PatientResponse from "./Pages/admin/PatientResponse";
import FeedbackManagement from "./Pages/admin/FeedbackManagement";
import AdminHistory from "./Pages/admin/AdminHistory";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ResetPassword from "./Pages/auth/ResetPassword";

const App = () => {
  // Get user role from localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // Listen for changes in localStorage & update state
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem("role") || "";
      console.log("Updated Role:", role);
      setUserRole(role);
    };

    // Manually check role on mount (important for refresh)
    handleStorageChange();

    // Event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      {/* Use a single dynamic Navbar */}
      <Navbar userRole={userRole} setUserRole={setUserRole} />


      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/admin_profile" element={<AdminProfile />} />
          <Route path="/blood_stock" element={<BloodStock />} />
          <Route path="/donation_requests" element={<DonationRequests />} />
          <Route path="/patient_response" element={<PatientResponse />} />
          <Route path="/feedback_management" element={<FeedbackManagement />} />
          <Route path="/adminhistory" element={<AdminHistory />} />
        </Route>

        {/* Protected User Routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["user"]} />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/donate_blood" element={<Donate_Blood />} />
          <Route path="/request_blood" element={<Request_Blood />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/logout" element={<Logout setUserRole={setUserRole} />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
