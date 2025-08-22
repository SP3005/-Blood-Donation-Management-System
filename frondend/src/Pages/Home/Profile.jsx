import React, { useState } from 'react';
import '../../assets/styles/Profile.css';
import profileImage from '../../assets/images/2.png';  // Replace with your image
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const { userInfo } = location.state || {};

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    bloodGroup: "O+",
    phone: "+1 234 567 890",
    location: "123 Blood Donation Street, City, Country",
    dob: "1990-05-15"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
console.log(userInfo);

  return (
    <div className="profile-page">
      
      {/* Profile Header Section */}
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt="User" />
        </div>
        <div className="profile-info">
          <h1>{userInfo.name}</h1>
          <p>Email: {userInfo.email}</p>
          <p>Phone Number: {userInfo.phone}</p>
          <p>Address: {userInfo.location}</p>
          <p>Date of Birth: {new Date(userInfo.dob).toLocaleDateString("en-GB")}</p>
          {/* <p>Blood Group: <span className="blood-group">{user.bloodGroup}</span></p> */}
        </div>
      </div>

      {/* Profile Details Section */}
      {/* <div className="profile-details">
        <h2>Profile Details</h2>
        <form>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="btn-container">
            {isEditing ? (
              <button type="button" className="save-btn" onClick={toggleEdit}>Save</button>
            ) : (
              <button type="button" className="edit-btn" onClick={toggleEdit}>Edit Profile</button>
            )}
          </div>
        </form>
      </div> */}

    </div>
  );
};

export default Profile;