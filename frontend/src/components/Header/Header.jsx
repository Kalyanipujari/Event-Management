import React from 'react'
import './Header.css'
const Header = () => {
  
    const handleViewEventClick = () => {
      document.getElementById('event-display').scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <div className='header' >
        <div className="header-contents">
            <h2>Schedule Event</h2>
            <p>Start exploring now and find your next favorite event!</p>
            <button onClick={handleViewEventClick}>View Event</button>
        </div>
    </div>
  )
}

export default Header