import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/AdminDashboard.css';
import { FaTint, FaUserPlus, FaClock, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, activitiesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/stats'),
          axios.get('http://localhost:5000/api/dashboard/recent-activities')
        ]);
        setStats(statsResponse.data);
        setRecentActivities(activitiesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Admin Dashboard Overview</h1>
        <p>Monitor blood stock levels, requests, and recent activities.</p>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaTint className="stat-icon blood" />
          <h3>Total Blood Stock</h3>
          <p>{stats.totalBloodStock} Units</p>
        </div>

        <div className="stat-card">
          <FaUserPlus className="stat-icon request" />
          <h3>Donation Requests</h3>
          {console.log(stats)}
          <p>{stats.donationRequests}</p>
        </div>

        <div className="stat-card">
          <FaClock className="stat-icon pending" />
          <h3>Pending Requests of Patient </h3>
          <p>{stats.pendingRequests}</p>
        </div>

        <div className="stat-card">
          <FaClipboardList className="stat-icon approved" />
          <h3>Approved Requests of Patient</h3>
          <p>{stats.approvedRequests}</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity) => (
            <li key={activity.id}>
              <p>{activity.action}</p>
              <span>{new Date(activity.time).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
