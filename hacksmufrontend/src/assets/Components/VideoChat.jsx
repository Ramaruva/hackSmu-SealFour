import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

const VideoChat = ({ peerIdToCall, setStartVideoCall }) => {
  const [peer, setPeer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const newPeer = new Peer(); // Create a new peer instance
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      console.log('My peer ID is:', id);
    });

    newPeer.on('call', (incomingCall) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          incomingCall.answer(stream);

          incomingCall.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });
    });

    return () => {
      if (peer) peer.destroy();
    };
  }, []);

  const startCall = () => {
    if (!peerIdToCall) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;

        const outgoingCall = peer.call(peerIdToCall, stream);
        outgoingCall.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });

        setCallActive(true);
        setCallEnded(false);
      });
  };

  const endCall = () => {
    if (peer) peer.disconnect();
    setCallActive(false);
    setCallEnded(true);
    setStartVideoCall(false);
  };

  return (
    <div className="video-chat-container flex flex-col items-center mt-6">
      <div className="flex flex-row justify-center space-x-6 mb-4">
        <div className="video-frame">
          <video ref={myVideoRef} autoPlay muted className="rounded-lg shadow-lg h-64 w-96"></video>
          <p className="text-center text-gray-700 mt-2">Your Video</p>
        </div>
        <div className="video-frame">
          <video ref={remoteVideoRef} autoPlay className="rounded-lg shadow-lg h-64 w-96"></video>
          <p className="text-center text-gray-700 mt-2">Doctor's Video</p>
        </div>
      </div>

      {!callActive && (
        <button
          onClick={startCall}
          className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          Start Video Call
        </button>
      )}

      {callActive && !callEnded && (
        <button
          onClick={endCall}
          className="bg-red-600 text-white px-8 py-2 rounded-md hover:bg-red-700 transition duration-300 mt-4"
        >
          End Video Call
        </button>
      )}

      {callEnded && (
        <p className="text-red-600 mt-4">Call Ended</p>
      )}
    </div>
  );
};

export default VideoChat;
