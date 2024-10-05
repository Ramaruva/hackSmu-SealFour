import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-3xl font-extrabold hover:text-gray-400 transition duration-300">
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
        <ul className={`lg:flex lg:space-x-8 text-lg font-medium ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <li>
            <Link 
              className="text-gray-300 hover:text-white transition duration-300 relative after:absolute after:bg-white after:h-0.5 after:w-full after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" 
              to="/mental-health"
            >
              Mental Health
            </Link>
          </li>
          <li>
            <Link 
              className="text-gray-300 hover:text-white transition duration-300 relative after:absolute after:bg-white after:h-0.5 after:w-full after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" 
              to="/fitness-tracker"
            >
              Fitness Tracker
            </Link>
          </li>
          <li>
            <Link 
              className="text-gray-300 hover:text-white transition duration-300 relative after:absolute after:bg-white after:h-0.5 after:w-full after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" 
              to="/telemedicine"
            >
              Telemedicine
            </Link>
          </li>
          <li>
            <Link 
              className="text-gray-300 hover:text-white transition duration-300 relative after:absolute after:bg-white after:h-0.5 after:w-full after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" 
              to="/peer-support"
            >
              Peer Support
            </Link>
          </li>
          <li>
            <Link 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" 
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link 
              className="text-gray-300 hover:text-white transition duration-300 relative after:absolute after:bg-white after:h-0.5 after:w-full after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300" 
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
