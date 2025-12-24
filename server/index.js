require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for now, lock down later
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection - MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas! 🚀"))
  .catch((err) => console.error("Could not connect to MongoDB:", err.message));

// Routes (Placeholder)
app.get('/', (req, res) => {
  res.send('Task Board API Running');
});

// Socket.io
require('./sockets/socketManager')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
