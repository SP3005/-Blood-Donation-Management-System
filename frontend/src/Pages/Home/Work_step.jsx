import React from 'react';
import '../../assets/styles/Work_step.css';
import { FaUserCheck, FaHeartbeat, FaTint, FaSmile, FaFileMedical, FaHandHoldingHeart } from 'react-icons/fa'; 

const HomePage = () => {
  const steps = [
    {
      icon: <FaUserCheck />,
      title: "Register",
      description: "Sign up or log in to your account to donate or request blood."
    },
    {
      icon: <FaFileMedical />,
      title: "Health Check",
      description: "Get your vitals checked to ensure you're eligible for donation."
    },
    {
      icon: <FaTint />,
      title: "Donate Blood",
      description: "Qualified donors proceed with the donation process safely."
    },
    {
      icon: <FaHeartbeat />,
      title: "Request Blood",
      description: "Patients in need can request blood and find nearby donors."
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Receive Help",
      description: "Get connected with a donor and receive the required blood unit."
    },
    {
      icon: <FaSmile />,
      title: "Save Lives",
      description: "Every donation saves lives and makes a difference."
    }
  ];

  return (
    <div className="home-page">
      {/* How It Works Section */}
      <div className="steps-container">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;