import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Health & Wellness
        </Link>

        {/* Hamburger Button for Mobile */}
        <button 
          className="text-white lg:hidden block" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Links */}
        <ul className={`lg:flex lg:space-x-6 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <li><Link className="text-gray-300 hover:text-white" to="/mental-health">Mental Health</Link></li>
          <li><Link className="text-gray-300 hover:text-white" to="/fitness-tracker">Fitness Tracker</Link></li>
          <li><Link className="text-gray-300 hover:text-white" to="/telemedicine">Telemedicine</Link></li>
          <li><Link className="text-gray-300 hover:text-white" to="/peer-support">Peer Support</Link></li>
          <li><Link className="text-gray-300 hover:text-white" to="/signup">Sign Up</Link></li>
          <li><Link className="text-gray-300 hover:text-white" to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
