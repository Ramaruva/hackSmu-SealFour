import React, { useEffect, useState, useRef } from 'react';
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
import Chatbot from './assets/Components/Chatbot';
import DoctorDashboard from './assets/Components/DoctorDashboard';  
import VideoChat from './assets/Components/VideoChat';
import io from "socket.io-client";
import { getLocalItem } from './localStorage';

const App = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const socket = useRef();

  useEffect(() => {
    // Initialize socket connection
    socket.current = io('http://localhost:3000');;

    // Assuming the user ID is available after login
    const userdata = getLocalItem('userdetails');

    // Register the user on socket
    if (userdata._id) {
      socket.current.emit("register", userdata._id);
    }

    // Listen for incoming calls
    socket.current.on('incoming-call', ({ from }) => {
      setIncomingCall(from);  // Set the incoming call notification
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const acceptCall = () => {
    // Navigate to VideoChat and pass the required peerId
    setIncomingCall(null);  // Hide the notification once the call is accepted
  };

  return (
    <Router>
      <div>
        <Navbar />
        {incomingCall && (
          <div className="alert alert-info fixed top-0 w-full text-center bg-blue-500 text-white">
            Incoming call from {incomingCall}
            <button
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={acceptCall}
            >
              Join Call
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mental-health" element={<MentalHealth />} />  
          <Route path="/fitness-tracker" element={<FitnessTracker />} />
          <Route path="/telemedicine" element={<TelemedicinePage />} />
          <Route path="/peer-support" element={<PeerSupportPage />} />
          <Route path="/signup" element={<Signup />} />  
          <Route path="/signin" element={<Signin />} />  
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />  
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/video-chat" element={<VideoChat peerIdToCall={incomingCall} />} /> {/* Pass the peer ID to call */}
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
