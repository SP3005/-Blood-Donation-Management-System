import React from 'react';
import '../../assets/styles/AboutUS.css';
import aboutImage from '../../assets/images/aboutUS.jpg';  // Replace with your image path
import aboutImage1 from '../../assets/images/aboutUs1.jpg';
import team1 from '../../assets/images/2.png';  // Replace with team image
import team2 from '../../assets/images/2.png';
import team3 from '../../assets/images/2.png';

const AboutUs = () => {
  return (
    <div className="about-us-page">

      {/* Hero Section */}
      <div className="about-hero" style={{ backgroundImage: `url(${aboutImage1})` }}>
        <div className="hero-overlay">
          <h1>About <span className="highlight">Us</span></h1>
          <p>Empowering lives through blood donation and saving countless lives every day.</p>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-image">
          <img src={aboutImage} alt="About Blood Donation" />
        </div>
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            <strong>Share Life, Give Blood</strong> is dedicated to connecting blood donors with those in need.
            Our mission is to create a seamless and efficient platform where donors can make a life-saving impact.
          </p>
          <p>
            We believe in the power of community and strive to ensure that no patient suffers due to the lack of blood availability.
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="mission-vision-section">
        <div className="card">
          <h3>Our Mission</h3>
          <p>To promote safe and accessible blood donation, ensuring that no life is lost due to a lack of blood.</p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>To create a world where blood donation is a widespread and routine act of compassion.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">

          <div className="team-card">
            <img src={team1} alt="Team Member" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>

          <div className="team-card">
            <img src={team2} alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Operations Manager</p>
          </div>

          <div className="team-card">
            <img src={team3} alt="Team Member" />
            <h3>Michael Johnson</h3>
            <p>Blood Donation Coordinator</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AboutUs;