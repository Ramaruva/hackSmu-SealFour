import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Components/Navbar';
import HomePage from './assets/Components/Homepage';
import Signup from './assets/Components/Signup';   
import Signin from './assets/Components/Signin';   
import MentalHealth from './assets/Components/Mentalhealth'; 
import FitnessTracker from './assets/Components/FitnessTracker';
import TelemedicinePage from './assets/Components/Telemedicine';
import PeerSupportPage from './assets/Components/PeerSupport';
import ContactPage from './assets/Components/Contactus';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          
          <Route path="/mental-health" element={<MentalHealth />} />  
          <Route path="/fitness-tracker" element={<FitnessTracker />} />
          <Route path="/telemedicine" element={<TelemedicinePage/>} />
          <Route path="/peer-support" element={<PeerSupportPage/>} />
          <Route path="/signup" element={<Signup />} />  
          <Route path="/signin" element={<Signin />} />  
          
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
