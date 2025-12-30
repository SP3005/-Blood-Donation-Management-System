// src/pages/UserHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const UserHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/user-history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching user history:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-red-700">
        User History
      </h2>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-100 text-red-900">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.actionType}</td>
                  <td className="p-2 border">{item.bloodGroup}</td>
                  <td className="p-2 border">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {item.location || 'N/A'}
                  </td>
                  <td className="p-2 border">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserHistory;
