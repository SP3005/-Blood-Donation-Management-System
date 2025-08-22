import React from 'react';
import '../../assets/styles/Benefits.css';

const HomePage = () => {
  const benefits = [
    {
      title: "Saves Lives",
      description: "One blood donation can save up to three lives. Your contribution makes a huge impact."
    },
    {
      title: "Improves Heart Health",
      description: "Regular blood donation can reduce harmful iron stores and improve heart health."
    },
    {
      title: "Promotes Blood Production",
      description: "After donating, the body produces new cells, maintaining healthy blood circulation."
    },
    {
      title: "Helps in Weight Loss",
      description: "Donating blood burns calories, which can contribute to maintaining a healthy weight."
    },
    {
      title: "Provides Free Health Checkup",
      description: "Donors receive free health checkups including blood pressure, pulse, and hemoglobin levels."
    },
    {
      title: "Reduces Cancer Risk",
      description: "Donating blood may lower the risk of certain cancers by reducing iron levels in the blood."
    }
  ];

  return (
    <div className="home-page">
      {/* Benefits of Blood Donation Section */}
      <div className="benefits-container">
        <h2>Benefits of Blood Donation</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;