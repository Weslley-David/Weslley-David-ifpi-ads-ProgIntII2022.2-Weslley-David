import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
function Navbar() {
  return (
    <>
      <nav className='links'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/countries">Countries</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar