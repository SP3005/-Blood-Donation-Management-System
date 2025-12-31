import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/Request_Blood.css';
import requestBloodImage from '../../assets/images/BloodRequest.jpg';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const RequestBlood = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    phone: '',
    email: '',
    units: '',
    location: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age < 18)
      newErrors.age = 'Valid age (18+) is required';
    if (!formData.bloodGroup)
      newErrors.bloodGroup = 'Blood group is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.units || isNaN(formData.units) || formData.units <= 0)
      newErrors.units = 'Valid blood unit quantity is required';
    if (!formData.location.trim())
      newErrors.location = 'Location is required';
    if (!formData.date)
      newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/blood-requests`,
        formData
      );

      alert('Blood request submitted successfully!');
      setFormData({
        name: '',
        age: '',
        bloodGroup: '',
        phone: '',
        email: '',
        units: '',
        location: '',
        date: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        'Failed to submit request. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const role = localStorage.getItem("role") || "";

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="request-blood-page">
      {/* Hero Section */}
      <div className="request-hero">
        <div className="hero-image">
          <img src={requestBloodImage} alt="Request Blood" />
        </div>
        <div className="hero-content">
          <h1>
            Request <span className="highlight">Blood</span>
          </h1>
          <p>
            Saving lives starts with a simple request. Submit your blood request
            and get the help you need quickly and efficiently.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="request-form-container">
        <h2>Request Blood Form</h2>

        <form onSubmit={handleSubmit}>
          {Object.entries({
            name: 'Name',
            age: 'Age',
            bloodGroup: 'Blood Group',
            phone: 'Phone',
            email: 'Email',
            units: 'Units Required',
            location: 'Location',
            date: 'Required Date',
            message: 'Message (optional)'
          }).map(([key, label]) => (
            <div className="form-group" key={key}>
              <label>{label}:</label>

              {key === 'bloodGroup' ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                    group => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={
                    key === 'date'
                      ? 'date'
                      : key === 'age' || key === 'units'
                      ? 'number'
                      : 'text'
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  disabled={loading}
                />
              )}

              {errors[key] && (
                <span className="error">{errors[key]}</span>
              )}
            </div>
          ))}

          {role === "user" ? (
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="submit-btn"
            >
              Sign In
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestBlood;
