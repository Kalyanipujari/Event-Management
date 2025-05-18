import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';
import developer1 from '../../assets/developer-1.jpeg';
import developer2 from '../../assets/developer-2.jpeg';
import developer3 from '../../assets/developer-3.jpeg';
import event1 from '../../assets/event1.jpg';


const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      designation: "CEO & Founder",
      image: developer1 // Updated to use developer-1.jpeg
    },
    {
      name: "Jane Smith",
      designation: "Event Manager",
      image: developer2 // Updated to use developer-2.jpeg
    },
    {
      name: "Mike Johnson",
      designation: "Creative Director",
      image: developer3 // Updated to use developer-3.jpeg
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2>Welcome to Event Management</h2>
          <p>
            We are passionate about creating unforgettable experiences through exceptional event management. 
            With years of expertise in the industry, we specialize in crafting memorable events that exceed expectations.
          </p>
          <p>
            Our team of dedicated professionals works tirelessly to ensure every detail is perfect, 
            from venue selection to entertainment, catering, and beyond. We believe that every event 
            tells a unique story, and we're here to help you tell yours.
          </p>
        </div>
        <div className="about-image">
          <img src={event1} alt="About Us" />
        </div>
      </div>

      <div className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
