import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/DonationRequests.css';
import { FaFilter } from 'react-icons/fa';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const DonationRequests = () => {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState({
    name: '',
    bloodGroup: '',
    status: ''
  });

  // 🔹 Fetch donation requests
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/donate/donations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donation records:', error);
      }
    };

    fetchDonations();
  }, []);

  // 🔹 Approve / Reject donation
  const handleStatusUpdate = async (id, status) => {
    try {
      const endpoint =
        status === 'Approved'
          ? `${API_URL}/api/donate/donations/approve/${id}`
          : `${API_URL}/api/donate/donations/reject/${id}`;

      await axios.put(
        endpoint,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // Update UI instantly
      setDonations(prev =>
        prev.map(donation =>
          donation._id === id
            ? { ...donation, status }
            : donation
        )
      );
    } catch (error) {
      console.error('Error updating donation status:', error);
    }
  };

  // 🔹 Filtering logic
  const filteredDonations = donations.filter((donation) =>
    donation.units > 0 &&
    donation.name.toLowerCase().includes(filter.name.toLowerCase()) &&
    donation.bloodGroup.includes(filter.bloodGroup) &&
    donation.status.includes(filter.status)
  );

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'pending';
      case 'approved': return 'approved';
      case 'rejected': return 'rejected';
      default: return '';
    }
  };

  const filteredByStatus = (status) =>
    filteredDonations.filter(
      donation => donation.status.toLowerCase() === status
    );

  return (
    <div className="donation-requests-page">
      <h2>Donation Requests</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <FaFilter className="filter-icon" />

        <input
          type="text"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={(e) =>
            setFilter({ ...filter, name: e.target.value })
          }
        />

        <select
          value={filter.bloodGroup}
          onChange={(e) =>
            setFilter({ ...filter, bloodGroup: e.target.value })
          }
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <select
          value={filter.status}
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Pending Requests */}
      <div className="response-section pending">
        <h3>Pending Requests</h3>
        <div className="scroll-container">
          {filteredByStatus('pending').length === 0 ? (
            <p>No pending requests found.</p>
          ) : (
            filteredByStatus('pending').map((donation) => (
              <div
                key={donation._id}
                className={`request-card ${getStatusClass(donation.status)}`}
              >
                <h3>{donation.name}</h3>
                <p>Blood Group: <strong>{donation.bloodGroup}</strong></p>
                <p>Status: <span>{donation.status}</span></p>

                <div className="actions">
                  <button
                    onClick={() => handleStatusUpdate(donation._id, 'Approved')}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(donation._id, 'Rejected')}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Approved Requests */}
      <div className="response-section approved">
        <h3>Approved Requests</h3>
        <div className="scroll-container">
          {filteredByStatus('approved').length === 0 ? (
            <p>No approved requests found.</p>
          ) : (
            filteredByStatus('approved').map((donation) => (
              <div
                key={donation._id}
                className={`request-card ${getStatusClass(donation.status)}`}
              >
                <h3>{donation.name}</h3>
                <p>Blood Group: <strong>{donation.bloodGroup}</strong></p>
                <p>Status: <span>{donation.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rejected Requests */}
      <div className="response-section rejected">
        <h3>Rejected Requests</h3>
        <div className="scroll-container">
          {filteredByStatus('rejected').length === 0 ? (
            <p>No rejected requests found.</p>
          ) : (
            filteredByStatus('rejected').map((donation) => (
              <div
                key={donation._id}
                className={`request-card ${getStatusClass(donation.status)}`}
              >
                <h3>{donation.name}</h3>
                <p>Blood Group: <strong>{donation.bloodGroup}</strong></p>
                <p>Status: <span>{donation.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
