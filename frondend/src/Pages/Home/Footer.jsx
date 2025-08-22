import React from 'react';
import { Link } from 'react-router-dom';  // React Router Link
import '../../assets/styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      {/* Navigation Links */}
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/donate_blood">Donate</Link>
        <Link to="/request_blood">Request Blood</Link>
        <Link to="/contactus">Contact</Link>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <Link to="/facebook" aria-label="Facebook"><FaFacebookF /></Link>
        <Link to="/twitter" aria-label="Twitter"><FaTwitter /></Link>
        <Link to="/instagram" aria-label="Instagram"><FaInstagram /></Link>
        <Link to="/linkedin" aria-label="LinkedIn"><FaLinkedinIn /></Link>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Share Life, Give Blood. All rights reserved.</p>
      </div>
    
    </footer>
  );
};

export default Footer;
