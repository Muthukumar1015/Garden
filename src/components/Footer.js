import React from "react";
import "../styles/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We provide the best gardening tools, plants, and advice to help your garden thrive.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Garden. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
