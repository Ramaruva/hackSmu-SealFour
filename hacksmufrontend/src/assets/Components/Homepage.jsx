import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="bg-gray-100 h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to Health & Wellness Platform
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Explore mental health resources, track your fitness, and access telemedicine services.
        </p>
        <div className="mt-8 space-x-4">
          <Link to="/mental-health" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Explore Mental Health
          </Link>
          <Link to="/fitness-tracker" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Track Fitness
          </Link>
          <Link to="/telemedicine" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            Access Telemedicine
          </Link>
          <Link to="/peer-support" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
            Peer Support
          </Link>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-gray-800 py-16 text-white text-center">
        <h2 className="text-3xl font-semibold">Take Care of Your Health</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Our platform provides you with all the tools to manage your physical and mental health. Join the community and connect with peers.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
