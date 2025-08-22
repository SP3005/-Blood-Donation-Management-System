import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin_styles/PatientResponse.css';

const PatientResponse = () => {
  const [requests, setRequests] = useState([]);

  // Fetch blood requests from the API on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blood-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching blood requests:', error);
      }
    };
    fetchRequests();
  }, []);

  // Update the status using API endpoints and then update local state
  const updateStatus = async (id, newStatus) => {
    try {
      const endpoint = newStatus === 'approved'
        ? `http://localhost:5000/api/blood-requests/approve/${id}`
        : `http://localhost:5000/api/blood-requests/reject/${id}`;
      await axios.put(endpoint, { status: newStatus });
      setRequests(prev =>
        prev.map(req => req._id === id ? { ...req, status: newStatus } : req)
      );
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  // Returns a CSS class based on the status (make sure your CSS matches these classes)
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'pending';
      case 'approved': return 'approved';
      case 'rejected': return 'rejected';
      default: return '';
    }
  };

  // Filter requests based on status
  const filteredRequests = (status) =>
    requests.filter(req => req.status.toLowerCase() === status);

  return (
    <div className="patient-response-page">
      <h1>Patient Blood Requests</h1>

      {/* Pending Requests */}
      <div className="response-section pending">
        <h2>Pending Requests</h2>
        <div className="scroll-container">
          {filteredRequests('pending').length === 0 ? (
            <p>No pending requests found.</p>
          ) : (
            filteredRequests('pending').map(req => (
              <div key={req._id} className={`request-card ${getStatusClass(req.status)}`}>
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

      {/* Approved Requests */}
      <div className="response-section approved">
        <h2>Approved Requests</h2>
        <div className="scroll-container">
          {filteredRequests('approved').length === 0 ? (
            <p>No approved requests found.</p>
          ) : (
            filteredRequests('approved').map(req => (
              <div key={req._id} className={`request-card ${getStatusClass(req.status)}`}>
                <h3>{req.name}</h3>
                <p>Blood Group: <strong>{req.bloodGroup}</strong></p>
                <p>Status: <span>{req.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rejected Requests */}
      <div className="response-section rejected">
        <h2>Rejected Requests</h2>
        <div className="scroll-container">
          {filteredRequests('rejected').length === 0 ? (
            <p>No rejected requests found.</p>
          ) : (
            filteredRequests('rejected').map(req => (
              <div key={req._id} className={`request-card ${getStatusClass(req.status)}`}>
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
