import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/FeedbackManagement.css';
import { FaStar, FaTrash } from 'react-icons/fa';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);

  // 🔹 Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/feedback`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // 🔹 Delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/feedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setFeedback(prevFeedback =>
        prevFeedback.filter(item => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  // 🔹 Rating stars
  const getRatingStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index < rating ? '#f0ad4e' : '#ccc'}
      />
    ));

  const filterByType = (type) =>
    feedback.filter(item => item.role?.toLowerCase() === type);

  return (
    <div className="feedback-management-page">
      <h1>User Feedback Management</h1>

      {/* Donor Feedback */}
      <div className="feedback-section donor">
        <h2>Donor Feedback</h2>
        <div className="scroll-container">
          {filterByType('donor').length === 0 ? (
            <p>No donor feedback available.</p>
          ) : (
            filterByType('donor').map(item => (
              <div key={item._id} className="feedback-card">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    {getRatingStars(item.rating)}
                  </div>
                </div>

                <p>{item.comment}</p>

                <div className="actions">
                  <button
                    onClick={() => deleteFeedback(item._id)}
                    className="delete-btn"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Patient Feedback */}
      <div className="feedback-section patient">
        <h2>Patient Feedback</h2>
        <div className="scroll-container">
          {filterByType('patient').length === 0 ? (
            <p>No patient feedback available.</p>
          ) : (
            filterByType('patient').map(item => (
              <div key={item._id} className="feedback-card">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    {getRatingStars(item.rating)}
                  </div>
                </div>

                <p>{item.comment}</p>

                <div className="actions">
                  <button
                    onClick={() => deleteFeedback(item._id)}
                    className="delete-btn"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
