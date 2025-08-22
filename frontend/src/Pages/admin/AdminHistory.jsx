import React, { useState } from 'react';
import '../../assets/styles/Admin_styles/AdminHistory.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const History = () => {
  const [activeTab, setActiveTab] = useState('yearly');

  const donationData = {
    yearly: [450, 380, 520, 600, 480],
    monthly: [50, 65, 70, 80, 90, 100, 120, 130, 140, 160, 180, 200],
    weekly: [15, 20, 18, 25, 30, 22, 27]
  };

  const requestData = {
    yearly: [300, 320, 400, 450, 410],
    monthly: [40, 55, 60, 75, 85, 90, 110, 125, 130, 150, 170, 180],
    weekly: [12, 18, 14, 20, 25, 19, 22]
  };

  const labels = {
    yearly: ['2020', '2021', '2022', '2023', '2024'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const data = {
    labels: labels[activeTab],
    datasets: [
      {
        label: 'Blood Donations',
        data: donationData[activeTab],
        backgroundColor: '#5cb85c',
        borderColor: '#5cb85c',
        borderWidth: 1
      },
      {
        label: 'Blood Requests',
        data: requestData[activeTab],
        backgroundColor: '#d9534f',
        borderColor: '#d9534f',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Blood Donation and Request History (${activeTab.toUpperCase()})`
      }
    }
  };

  return (
    <div className="history-page">
      <h1>History Overview</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === 'yearly' ? 'active' : ''} onClick={() => setActiveTab('yearly')}>Yearly</button>
        <button className={activeTab === 'monthly' ? 'active' : ''} onClick={() => setActiveTab('monthly')}>Monthly</button>
        <button className={activeTab === 'weekly' ? 'active' : ''} onClick={() => setActiveTab('weekly')}>Weekly</button>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      {/* Line Chart */}
      <div className="line-chart-container">
        <h2>Blood Donation and Request Trends</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default History;