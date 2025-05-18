import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
        <div className="footer-content-left">
    <img src={assets.logo} alt="" />
    <p>Want to scheule event? Contact us for more information. Find details in contact section.</p>
    <div className="footer-social-icons">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.linkedin_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
    </div>
        </div>
        
        <div className="footer-content-center">
    <h2>COMPANY</h2>
    <ul>
        <li >Home</li>
        <li >About us</li>
        <li >Delivery</li>
        <li >Privacy policy</li>
    </ul>
        </div>
        <div className="footer-content-right">
    <h2>GET IN TOUCH</h2>
    <ul>
        <li>+91 6585457515</li>
        <li>eventmanagementcdac@gmail.com</li>
    </ul>
        </div>
    </div>
    <hr />
    <p className="footer-copyright">Copyright 2025 @ Event Management - All Right Reserved.</p>
        </div>
  )
}

export default Footer