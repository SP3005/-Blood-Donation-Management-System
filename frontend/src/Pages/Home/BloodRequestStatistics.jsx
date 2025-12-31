import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Blood_Request_Statistics.css';

// ✅ Backend URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const BloodRequestStatistics = () => {
  const [statistics, setStatistics] = useState({
    allRequests: 0,
    donationRequests: 0,
    approvedRequests: 0,
    livesSaved: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/dashboard/stats`
        );

        setStatistics({
          allRequests: res.data.allRequests,
          donationRequests: res.data.donationRequests,
          approvedRequests: res.data.approvedRequests,
          livesSaved: res.data.approvedRequests * 3
        });

        setLoading(false);
      } catch (err) {
        console.error("STAT API ERROR:", err);
        setError("Failed to load statistics data.");
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="stats-container">
      <h2>Blood Donation and Request Statistics</h2>

      {loading ? (
        <p>Loading statistics...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{statistics.allRequests}</h3>
            <p>Total Donors</p>
          </div>

          <div className="stat-card">
            <h3>{statistics.donationRequests}</h3>
            <p>Total Requests</p>
          </div>

          <div className="stat-card">
            <h3>{statistics.approvedRequests}</h3>
            <p>Total Donations</p>
          </div>

          <div className="stat-card">
            <h3>{statistics.livesSaved}</h3>
            <p>Lives Saved</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodRequestStatistics;
