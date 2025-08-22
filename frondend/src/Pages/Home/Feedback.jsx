// UserFeedback.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Feedback.css';
import { useNavigate } from 'react-router-dom';

const UserFeedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Donor',
    rating: 5,
    comment: ''
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', formData);
      if (response.status === 201) {
        setSubmitted(true);
        setFormData({ name: '', role: 'Donor', rating: 5, comment: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  const role = localStorage.getItem("role") || "";
console.log("Updated Role:", role);
const handleLogin = () =>{
  navigate("/login");
}
  return (
    <div className="feedback-page">
      <h1>Share Your Feedback</h1>
      {submitted && (
        <div className="success-message">
          🎉 Thank you for your feedback!
        </div>
      )}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">You are a:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="Donor">Donor</option>
            <option value="Patient">Patient</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            placeholder="Write your feedback here..."
          />
        </div>
        {role === "user" ?   <button type="submit" className="submit-btn">Submit Feedback</button>:   <button onClick={handleLogin} className="submit-btn">Sign In</button>}
        
      </form>
    </div>
  );
};

export default UserFeedback;
