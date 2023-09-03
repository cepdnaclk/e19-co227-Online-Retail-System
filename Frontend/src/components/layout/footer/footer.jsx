import React from "react";
import './footer.component.css'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
           
            <h1 className="logo" style={{ fontFamily: 'Wide Latin', marginLeft: '10px' + 'em' }}>CartWiz</h1>
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-social">
            {/* Add your social media icons or links */}
            <a href="#"><i className="fab fa-facebook"></i>link 1</a>
            <a href="#"><i className="fab fa-twitter"></i>link 2</a>
            <a href="#"><i className="fab fa-instagram"></i>linkk</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
