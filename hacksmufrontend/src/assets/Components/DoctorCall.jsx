import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const DoctorCall = ({ studentId }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001');

    peerConnection.current = new RTCPeerConnection();

    // Capture local stream (doctor's camera/microphone)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
    });

    // Send ICE candidates to student
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit('ice-candidate', { candidate: event.candidate, receiverId: studentId });
      }
    };

    // Listen for student's stream
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Listen for offer from student
    socket.current.on('offer', async (data) => {
      const remoteDesc = new RTCSessionDescription(data.offer);
      await peerConnection.current.setRemoteDescription(remoteDesc);

      // Create and send answer
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit('answer', { answer, receiverId: data.senderId });
    });

    // Listen for ICE candidates from student
    socket.current.on('ice-candidate', async (data) => {
      const candidate = new RTCIceCandidate(data.candidate);
      await peerConnection.current.addIceCandidate(candidate);
    });

    return () => socket.current.disconnect();
  }, [studentId]);

  return (
    <div>
      <h2>Doctor Video Call</h2>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default DoctorCall;
