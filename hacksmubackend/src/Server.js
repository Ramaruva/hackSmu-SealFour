// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(server);

app.use('/api/auth', authRoutes);


// Socket.IO connection handling for signaling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handling 'offer' sent by student
    socket.on('offer', (data) => {
        console.log('Offer received:', data);
        socket.to(data.receiverId).emit('offer', data);
    });

    // Handling 'answer' sent by doctor
    socket.on('answer', (data) => {
        console.log('Answer received:', data);
        socket.to(data.receiverId).emit('answer', data);
    });

    // Handling ICE candidates from both parties
    socket.on('ice-candidate', (data) => {
        console.log('ICE Candidate:', data);
        socket.to(data.receiverId).emit('ice-candidate', data);
    });
    socket.on('send-ice-candidate', (data) => {
        socket.to(data.id).emit('receive-ice-candidate', data.candidate);
      });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Signaling server listening on port 3001');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
