import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Components/Navbar';
import HomePage from './assets/Components/Homepage'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add your routes for the rest of the components like Mental Health, Fitness, etc. */}
          <Route path="/mental-health" element={<div>Mental Health Component</div>} />
          <Route path="/fitness-tracker" element={<div>Fitness Tracker Component</div>} />
          <Route path="/telemedicine" element={<div>Telemedicine Component</div>} />
          <Route path="/peer-support" element={<div>Peer Support Component</div>} />
          <Route path="/signup" element={<div>Sign Up Component</div>} />
          <Route path="/contact" element={<div>Contact Component</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
