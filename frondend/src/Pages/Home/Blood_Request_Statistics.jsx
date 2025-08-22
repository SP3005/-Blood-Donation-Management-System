import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Blood_Request_Statistics.css';

const Blood_Request_Statistics = () => {
  const [statistics, setStatistics] = useState({
    donors: 0,
    requests: 0,
    donations: 0,
    livesSaved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics data.');
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
        <p>{error}</p>
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
            <h3>{statistics.approvedRequests}</h3>
            <p>Lives Saved</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blood_Request_Statistics;
