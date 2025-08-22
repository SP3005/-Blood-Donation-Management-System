import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Home.css';
import heroImage from '../../assets/images/1.jpg';
import Blood_Request_Statistics from './Blood_Request_Statistics';
import Benefits from './Benefits';
import Work_step from './Work_step';
import Recent_Blood_Requests from './Recent_Blood_Requests';
import Organization from './Organization';
import Contact from './Contact';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [bloodStock, setBloodStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDonate = () => {
    navigate('/donate_blood');
  };

  const goToRequest = () => {
    navigate('/request_blood');
  };

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donate/blood-stock');
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
    if (quantity > 100) return 'high';   // Green for good stock
    if (quantity >= 50) return 'medium'; // Yellow for moderate
    return 'low';                        // Red for low stock
  };

  if (loading) {
    return <p>Loading blood stock data...</p>;
  }

  return (
    <>
      <div className="home-page">
        {/* Hero Section */}
        <div className="hero-container">
          {/* Left Side: Image */}
          <div className="hero-image">
            <img src={heroImage} alt="Blood donation" />
          </div>

          {/* Right Side: Content */}
          <div className="hero-content">
            <h1>Share Life, <span className="highlight">Give Blood</span></h1>
            <p>Your blood donation can save up to three lives. Be the reason someone smiles today!</p>
            <div className="hero-buttons">
              <button className="btn donate-btn" onClick={goToDonate}>Donate Now</button>
              <button className="btn request-btn" onClick={goToRequest}>Request Blood</button>
            </div>
          </div>
        </div>

        {/* Blood Stock Availability */}
        <div className="blood-stock-container">
          <h2>Blood Stock Availability</h2>
          <div className="stock-grid">
            {bloodStock.map((item, index) =>  (
             
              <div key={index} className={`stock-card ${getStatus(item.quantity)}`}>
                <h3>{item._id}</h3>
                <p>{item.totalUnits} Units</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Blood_Request_Statistics />
      <Benefits />
      <Work_step />
      <Recent_Blood_Requests />
      <Organization />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
