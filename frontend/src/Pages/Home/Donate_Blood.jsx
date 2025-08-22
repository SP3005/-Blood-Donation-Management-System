import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Donate_Blood.css';
import heroImage from '../../assets/images/1.jpg';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    phone: '',
    email: '',
    date: '',
    message: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age < 18) newErrors.age = 'Valid age (18+) is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/donate/donate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Donation details submitted successfully!");
          setFormData({
            name: "",
            age: "",
            bloodGroup: "",
            phone: "",
            email: "",
            date: "",
            message: ""
          });
          setErrors({});
        } else {
          alert("Failed to submit donation");
        }
      } catch (error) {
        console.error("Error submitting donation:", error);
        alert("Error submitting donation");
      }
    }
  };
  const role = localStorage.getItem("role") || "";
console.log("Updated Role:", role);
const handleLogin = () =>{
  navigate("/login");
}
  return (
    <div className="donate-page">
      <div className="donate-hero">
        <div className="hero-content">
          <h1>Donate Blood, <span className="highlight">Save Lives</span></h1>
          <p>Every drop counts. Your donation can make a real difference in someone's life.</p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Donate blood" />
        </div>
      </div>

      <div className="donate-form-container">
        <h2>Blood Donation Form</h2>
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          {errors.name && <span className="error">{errors.name}</span>}
          
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age" />
          {errors.age && <span className="error">{errors.age}</span>}

          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
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
          {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}

          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          {errors.email && <span className="error">{errors.email}</span>}

          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Add any comments..." />
{role === "user" ?  <button type="submit" className="submit-btn">Submit</button> :   <button onClick={handleLogin} className="submit-btn">Sign In</button>}
          
        </form>
      </div>
    </div>
  );
};

export default Donate;
