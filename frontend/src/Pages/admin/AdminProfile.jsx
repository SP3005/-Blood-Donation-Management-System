import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/AdminProfile.css';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const AdminProfile = () => {

  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 🔹 Fetch admin profile
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setAdmin({
          ...res.data,
          password: '',
          confirmPassword: ''
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin profile");
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (admin.password && admin.password !== admin.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axios.put(`${API_URL}/api/admin/profile`, admin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setSuccess("Profile updated successfully ✅");
      setError(null);
      setAdmin({ ...admin, password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
      setSuccess(null);
    }
  };

  if (loading) {
    return <p className="admin-profile-page">Loading profile...</p>;
  }

  return (
    <div className="admin-profile-page">

      {/* Header */}
      <div className="profile-header">
        <h1>Admin Profile Management</h1>
        <p>View and update your details, manage contact info, and change password.</p>
      </div>

      <div className="profile-container">
        <form onSubmit={handleSubmit}>

          {/* Messages */}
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          {/* Profile Details */}
          <div className="form-section">
            <h2>Profile Details</h2>

            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={admin.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={admin.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={admin.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={admin.address} onChange={handleChange} required />
            </div>
          </div>

          {/* Change Password */}
          <div className="form-section">
            <h2>Change Password</h2>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={admin.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
