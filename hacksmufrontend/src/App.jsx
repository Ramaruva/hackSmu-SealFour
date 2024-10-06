import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Components/Navbar";
import HomePage from "./assets/Components/Homepage";
import Signup from "./assets/Components/Signup";
import Signin from "./assets/Components/Signin";
import MentalHealth from "./assets/Components/Mentalhealth";
import FitnessTracker from "./assets/Components/FitnessTracker";
import TelemedicinePage from "./assets/Components/Telemedicine";
import PeerSupportPage from "./assets/Components/PeerSupport";
import ContactPage from "./assets/Components/Contactus";
import Chatbot from "./assets/Components/Chatbot";
import DoctorDashboard from "./assets/Components/DoctorDashboard";
import VideoChat from "./assets/Components/VideoChat";
import { getLocalItem } from "./localStorage";
import { io } from "socket.io-client";
import Peer from "peerjs";


const App = () => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [myPeerId, setMyPeerId] = useState("");
  const [peerIdToCall, setPeerIdToCall] = useState(""); // Add this state to store peerId to call
  const [startVideoCall, setStartVideoCall] = useState(false); // State to control when to start call
  const peerInstance = useRef(null);
  const socket = useRef(null); // Create a ref for the socket instance

  useEffect(() => {
    const userData = getLocalItem("userdetails");
    const userid = userData?._id;
    socket.current = io("http://localhost:3001");
    const peer = new Peer(undefined, {
      host: "localhost",
      port: 3001,
      path: "/peerjs",
    });
    peerInstance.current = peer;
    if (userData && userid) {
      peer.on("open", (peerId) => {
        setMyPeerId(peerId);
        console.log(userid,"userid");
        socket.current.emit("register", { userid, peerId }); // Register user1, can be dynamic
      });

      socket.current.on("incomingCall", ({ fromUserId }) => {
        console.log("Incoming call from user:", fromUserId); // Add logging
        setIncomingCall(fromUserId); // Show incoming call notification
      });
    }

    return () => {
      peer.destroy();
      socket.current.disconnect();
    };
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        {incomingCall && (
          <div className="alert alert-info fixed top-0 w-full text-center bg-blue-500 text-white">
            Incoming call from {incomingCall}
            <button
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setStartVideoCall(true)}
            >
              Join Call
            </button>
          </div>
        )}
        {startVideoCall && (
          <VideoChat
            peerIdToCall={myPeerId} // Pass Peer ID to video chat
            setStartVideoCall={setStartVideoCall}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/fitness-tracker" element={<FitnessTracker />} />
          <Route path="/telemedicine" element={<TelemedicinePage />} />
          <Route
            path="/peer-support"
            element={<PeerSupportPage socket={socket?.current}  peerId={myPeerId}/>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
