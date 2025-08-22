import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import '../../assets/styles/Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-page">

      {/* Contact and Social Media Section */}
      <div className="contact-container">
        
        {/* Left Side: Contact Information */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <div className="contact-details">
            <p><FaMapMarkerAlt /> 123 Blood Donor Street, Ahmedabad, Gujart 382330</p>
            <p><FaPhone /> +91 9909502307</p>
            <p><FaEnvelope /> sharelifegiveblood098@gmail.com</p>
          </div>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <Link to="/facebook" aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link to="/twitter" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link to="/instagram" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link to="/linkedin" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;