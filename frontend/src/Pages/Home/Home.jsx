import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Home.css';
import heroImage from '../../assets/images/1.jpg';
import BloodRequestStatistics from './BloodRequestStatistics';
import Benefits from './Benefits';
import Workstep from './Workstep';
import RecentBloodRequests from './RecentBloodRequests';
import Organization from './Organization';
import Contact from './Contact';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const [bloodStock, setBloodStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDonate = () => navigate('/donate_blood');
  const goToRequest = () => navigate('/request_blood');

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/donate/blood-stock`
        );
        setBloodStock(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blood stock data:', error);
        setLoading(false);
      }
    };

    fetchBloodStock();
  }, []);

  const getStatus = (quantity) => {
    if (quantity > 100) return 'high';   // Green
    if (quantity >= 50) return 'medium'; // Yellow
    return 'low';                        // Red
  };

  if (loading) {
    return <p>Loading blood stock data...</p>;
  }

  return (
    <>
      <div className="home-page">

        {/* Hero Section */}
        <div className="hero-container">
          <div className="hero-image">
            <img src={heroImage} alt="Blood donation" />
          </div>

          <div className="hero-content">
            <h1>Share Life, <span className="highlight">Give Blood</span></h1>
            <p>
              Your blood donation can save up to three lives.
              Be the reason someone smiles today!
            </p>
            <div className="hero-buttons">
              <button className="btn donate-btn" onClick={goToDonate}>
                Donate Now
              </button>
              <button className="btn request-btn" onClick={goToRequest}>
                Request Blood
              </button>
            </div>
          </div>
        </div>

        {/* Blood Stock Availability */}
        <div className="blood-stock-container">
          <h2>Blood Stock Availability</h2>
          <div className="stock-grid">
            {bloodStock.map((item, index) => (
              <div
                key={index}
                className={`stock-card ${getStatus(item.totalUnits)}`}
              >
                <h3>{item._id}</h3>
                <p>{item.totalUnits} Units</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <BloodRequestStatistics />
      <Benefits />
      <Workstep />
      <RecentBloodRequests />
      <Organization />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
