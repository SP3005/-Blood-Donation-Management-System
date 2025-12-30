import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/PatientResponse.css';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const PatientResponse = () => {
  const [requests, setRequests] = useState([]);

  // 🔹 Fetch patient blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/blood-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching blood requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // 🔹 Update request status
  const updateStatus = async (id, newStatus) => {
    try {
      const endpoint =
        newStatus === 'approved'
          ? `${API_URL}/api/blood-requests/approve/${id}`
          : `${API_URL}/api/blood-requests/reject/${id}`;

      await axios.put(
        endpoint,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // Update UI immediately
      setRequests(prev =>
        prev.map(req =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'pending';
      case 'approved': return 'approved';
      case 'rejected': return 'rejected';
      default: return '';
    }
  };

  const filteredRequests = (status) =>
    requests.filter(req => req.status.toLowerCase() === status);

  return (
    <div className="patient-response-page">
      <h1>Patient Blood Requests</h1>

      {/* Pending */}
      <div className="response-section pending">
        <h2>Pending Requests</h2>
        <div className="scroll-container">
          {filteredRequests('pending').length === 0 ? (
            <p>No pending requests found.</p>
          ) : (
            filteredRequests('pending').map(req => (
              <div
                key={req._id}
                className={`request-card ${getStatusClass(req.status)}`}
              >
                <h3>{req.name}</h3>
                <p>Blood Group: <strong>{req.bloodGroup}</strong></p>
                <p>Status: <span>{req.status}</span></p>

                <div className="actions">
                  <button
                    onClick={() => updateStatus(req._id, 'approved')}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req._id, 'rejected')}
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

      {/* Approved */}
      <div className="response-section approved">
        <h2>Approved Requests</h2>
        <div className="scroll-container">
          {filteredRequests('approved').length === 0 ? (
            <p>No approved requests found.</p>
          ) : (
            filteredRequests('approved').map(req => (
              <div
                key={req._id}
                className={`request-card ${getStatusClass(req.status)}`}
              >
                <h3>{req.name}</h3>
                <p>Blood Group: <strong>{req.bloodGroup}</strong></p>
                <p>Status: <span>{req.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rejected */}
      <div className="response-section rejected">
        <h2>Rejected Requests</h2>
        <div className="scroll-container">
          {filteredRequests('rejected').length === 0 ? (
            <p>No rejected requests found.</p>
          ) : (
            filteredRequests('rejected').map(req => (
              <div
                key={req._id}
                className={`request-card ${getStatusClass(req.status)}`}
              >
                <h3>{req.name}</h3>
                <p>Blood Group: <strong>{req.bloodGroup}</strong></p>
                <p>Status: <span>{req.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientResponse;
