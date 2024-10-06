// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const docRoutes = require("./routes/doctorRoutes");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();
connectDB();
const connectedUsers = {};

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(server);

app.use("/api/auth", authRoutes);
app.use("/api", docRoutes);

// Socket.IO connection handling for signaling

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Register user with their userId when they join
  socket.on('register', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User registered with ID: ${userId} and Socket ID: ${socket.id}`);
  });

  // Handle call initiation
  socket.on('call-user', ({ from, to }) => {
    console.log(`Call from ${from} to ${to}`);
    if (connectedUsers[to]) {
      // Notify the specific user
      io.to(connectedUsers[to]).emit('incoming-call', { from });
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (let userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3000');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
