import React from 'react';
import '../../assets/styles/ContectUS.css';
import contactImage from '../../assets/images/1.jpg';  // Replace with your image

const ContactUs = () => {
  return (
    <div className="contact-us-page">

      {/* Hero Section */}
      <div className="contactus-hero" style={{ backgroundImage: `url(${contactImage})` }}>
        <div className="hero-overlay">
          <h1>Contact <span className="highlight">Us</span></h1>
          <p>We are here to assist you. Reach out for any inquiries or support!</p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="contactus-info">
        <div className="info-card">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Address</h3>
          <p>123 Blood Donation Street, City, Country</p>
        </div>

        <div className="info-card">
          <i className="fas fa-phone-alt"></i>
          <h3>Phone</h3>
          <p>+1 234 567 890</p>
        </div>

        <div className="info-card">
          <i className="fas fa-envelope"></i>
          <h3>Email</h3>
          <p>support@sharelifegiveblood.com</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-container">
        <h2>Get In Touch</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Enter your message" required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

    </div>
  );
};

export default ContactUs;
