const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const docRoutes = require("./routes/doctorRoutes");
const http = require("http");
const socketIo = require("socket.io");
const { ExpressPeerServer } = require("peer");

dotenv.config();
connectDB();
const connectedUsers = {};

const app = express();
const server = http.createServer(app); // Single server for both HTTP and Socket.IO

// Setup CORS for both REST API and WebSocket (Socket.IO)
app.use(cors({
  origin: "http://localhost:5173", // Frontend port
  methods: ["GET", "POST"],
  credentials: true // Allow cookies and other credentials
}));

app.use(bodyParser.json());

// Initialize Socket.IO with CORS for WebSocket
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend to connect
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize PeerJS Server for video calls
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/peerjs", peerServer);

// REST API routes
app.use("/api/auth", authRoutes);
app.use("/api", docRoutes);

// Socket.IO connection handling for signaling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register user with their userId when they join
  socket.on("register", ({ userid, peerId }) => {
    console.log(userid)
    connectedUsers[userid] = peerId; // Store the user's peerId
    console.log(connectedUsers,"connecteduser");
    console.log(`User registered: ${userid} with Peer ID: ${peerId}`);
  });

  // Handle call initiation
  socket.on("callUser", ({ fromUserId, toUserId }) => {
    const peerIdToCall = connectedUsers[toUserId];
    console.log(peerIdToCall,"calluser",toUserId)
    console.log(connectedUsers,"connectedcall")
    if (peerIdToCall) {
        console.log(peerIdToCall,"incomingcall")
      io.to(peerIdToCall).emit("incomingCall", { fromUserId });
    }
  });

  // Notify the user if the recipient declines
  socket.on("call-decline", ({ callerId }) => {
    io.to(callerId).emit("call-declined");
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    for (let userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Start the server on a single port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
