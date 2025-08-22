import React, { useState } from 'react';
import '../../assets/styles/Admin_styles/AdminProfile.css';

const AdminProfile = () => {

  // Admin profile data
  const [admin, setAdmin] = useState({
    name: 'John Doe',
    email: 'admin@example.com',
    phone: '+1 123 456 7890',
    address: '123 Main St, City, Country',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    // Add API call to update admin profile
  };

  return (
    <div className="admin-profile-page">

      {/* Profile Header */}
      <div className="profile-header">
        <h1>Admin Profile Management</h1>
        <p>View and update your details, manage contact info, and change password.</p>
      </div>

      <div className="profile-container">

        {/* Admin Details Form */}
        <form onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>Profile Details</h2>

            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={admin.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={admin.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input 
                type="tel" 
                name="phone" 
                value={admin.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea 
                name="address" 
                value={admin.address} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Change Password Section */}
          <div className="form-section">
            <h2>Change Password</h2>

            <div className="form-group">
              <label>New Password:</label>
              <input 
                type="password" 
                name="password" 
                value={admin.password} 
                onChange={handleChange} 
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input 
                type="password" 
                name="confirmPassword" 
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