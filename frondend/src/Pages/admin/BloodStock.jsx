import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/Admin_styles/BloodStock.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BloodStock = () => {
  const [bloodStock, setBloodStock] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch blood stock data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donate/blood-stock")
      .then((response) => setBloodStock(response.data))
      .catch((error) => console.error("Error fetching blood stock:", error));
  }, []);

  // Get stock status based on count
  const getStatus = (totalUnits) => {
    if (totalUnits > 100) return "high";
    if (totalUnits >= 50) return "medium";
    return "low";
  };

  // Filtering logic
  const filteredStock = filter.trim()
    ? bloodStock.filter((item) =>
        item._id.toUpperCase().includes(filter.trim().toUpperCase())
      )
    : bloodStock;

  // Dynamic Chart Data
  const chartData = {
    labels: filteredStock.map((item) => item._id), // Blood groups (_id)
    datasets: [
      {
        label: "Blood Stock Levels",
        data: filteredStock.map((item) => item.totalUnits), // Use totalUnits
        backgroundColor: filteredStock.map((item) => {
          if (item.totalUnits > 100) return "#5cb85c"; // Green (High)
          if (item.totalUnits >= 50) return "#f0ad4e"; // Orange (Medium)
          return "#d9534f"; // Red (Low)
        }),
        borderWidth: 1,
      },
    ],
  };

  // Reduce blood unit and remove if count is 0
  const deleteStock = async (bloodGroup) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/donate/blood-stock/${bloodGroup}`);
  
      if (response.status === 200) {
        setBloodStock(response.data.updatedStock); // Update UI with latest stock
      }
    } catch (error) {
      console.error("Error reducing blood units:", error.response?.data?.error || error.message);
    }
  };
  


  return (
    <div className="blood-stock-page">
      <div className="header">
        <h1>Blood Stock Management</h1>
        <p>View, filter, and visualize blood stock data.</p>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search blood group (e.g., A+, B-)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="stock-list">
        {filteredStock
          .filter((item) => item.totalUnits > 0) // Ensure only groups with stock are shown
          .map((item) => (
            <div key={item._id} className={`stock-card ${getStatus(item.totalUnits)}`}>
              <h3>{item._id}</h3>
              <p>{item.totalUnits} Units</p>
              <button onClick={() => deleteStock(item._id)}>Reduce 1 Unit</button>
            </div>
          ))}
      </div>

      <div className="chart-container">
        <h2>Blood Stock Levels</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default BloodStock;
