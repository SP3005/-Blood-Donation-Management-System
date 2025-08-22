// FeedbackManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/FeedbackManagement.css';
import { FaStar, FaTrash } from 'react-icons/fa';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      setFeedback(prevFeedback => prevFeedback.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#f0ad4e' : '#ccc'} />
    ));
  };

  const filterByType = (type) => feedback.filter(item => item.role.toLowerCase() === type);

  return (
    <div className="feedback-management-page">
      <h1>User Feedback Management</h1>

      {/* Donor Feedback Section */}
      <div className="feedback-section donor">
        <h2>Donor Feedback</h2>
        <div className="scroll-container">
          {filterByType('donor').map(item => (
            <div key={item._id} className="feedback-card">
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className="rating">{getRatingStars(item.rating)}</div>
              </div>
              <p>{item.comment}</p>
              <div className="actions">
                <button onClick={() => deleteFeedback(item._id)} className="delete-btn">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Patient Feedback Section */}
      <div className="feedback-section patient">
        <h2>Patient Feedback</h2>
        <div className="scroll-container">
          {filterByType('patient').map(item => (
            <div key={item._id} className="feedback-card">
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className="rating">{getRatingStars(item.rating)}</div>
              </div>
              <p>{item.comment}</p>
              <div className="actions">
                <button onClick={() => deleteFeedback(item._id)} className="delete-btn">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeedbackManagement;
