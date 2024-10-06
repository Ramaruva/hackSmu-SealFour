import React, { useState, useRef } from 'react';
import io from 'socket.io-client';

const VideoCall = ({ doctorId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);  // Store the WebRTC connection
  const socket = io('http://localhost:3001'); // Connect to the backend (your signaling server)
  
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  // Start Call
  const startCall = async () => {
    peerConnection.current = new RTCPeerConnection();

    // Get the media stream
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = localStream;
    
    // Add local stream to peer connection
    localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));
    
    // Create offer and set local description
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    
    // Send the offer to the signaling server (socket.io)
    socket.emit('send-offer', { offer, doctorId });
    
    // Listen for the answer from the doctor
    socket.on('receive-answer', async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });
    
    // Handle incoming ICE candidates from the doctor
    socket.on('receive-ice-candidate', async (candidate) => {
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding received ICE candidate', error);
      }
    });
    
    // When remote stream is added
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
    
    // When ICE candidates are generated locally
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('send-ice-candidate', { candidate: event.candidate, doctorId });
      }
    };

    setCallStarted(true);
  };

  // End Call
  const endCall = () => {
    peerConnection.current.close();
    peerConnection.current = null;
    setCallStarted(false);
    setCallEnded(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Video Call with Doctor</h1>
      <div className="flex flex-row space-x-4">
        <div>
          <video ref={localVideoRef} autoPlay className="w-80 h-56 border-4 border-blue-500 rounded-lg" />
          <p className="text-center mt-2">Your Video</p>
        </div>
        <div>
          <video ref={remoteVideoRef} autoPlay className="w-80 h-56 border-4 border-green-500 rounded-lg" />
          <p className="text-center mt-2">Doctor's Video</p>
        </div>
      </div>
      {!callStarted ? (
        <button
          onClick={startCall}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Start Call
        </button>
      ) : (
        <button
          onClick={endCall}
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          End Call
        </button>
      )}
    </div>
  );
};

export default VideoCall;
