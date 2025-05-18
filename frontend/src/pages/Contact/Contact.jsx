import React from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';
import facebook_icon from '../../assets/facebook_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import linkedin_icon from '../../assets/linkedin_icon.png';
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any questions or inquiries</p>
      </div>

      <div className="contact-content">
        <div className="contact-card">
          <h2>Contact Information</h2>
          
          <div className="contact-info-item">
            <img src={assets.location_icon} alt="Location" className="contact-icon" />
            <div className="contact-details">
              <h3>Location</h3>
              <p>Mumbai, India</p>
            </div>
          </div>

          <div className="contact-info-item">
            <img src={assets.phone_icon} alt="Phone" className="contact-icon" />
            <div className="contact-details">
              <h3>Phone</h3>
              <p>+123-456-7890</p>
            </div>
          </div>

          <div className="contact-info-item">
            <img src={assets.email_icon} alt="Email" className="contact-icon" />
            <div className="contact-details">
              <h3>Email</h3>
              <p>eventmanagementcdac@gmail.com</p>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={facebook_icon} alt="Facebook" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={twitter_icon} alt="Twitter" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={linkedin_icon} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
