import React from 'react';
import '../../assets/styles/Organization.css';
import aboutImage from '../../assets/images/homeAbout.jpg';  // Replace with your image path

const HomePage = () => {
  return (
    <div className="home-page">

      {/* About the Organization Section */}
      <div className="about-container">
        <div className="about-content">
          <h2>About <span className="highlight">Share Life, Give Blood</span></h2>
          <p>
            Our mission is to create a sustainable and reliable blood donation network 
            that connects donors with patients in need. We strive to promote voluntary 
            blood donation, raise awareness, and ensure a safe and timely blood supply.
          </p>
          <p>
            Every drop counts, and your contribution can save multiple lives. Join us 
            in making a difference by becoming a donor or by requesting blood for 
            those in urgent need.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Donations Made</p>
            </div>
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Lives Saved</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Hospitals Supported</p>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img src={aboutImage} alt="About blood donation" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;