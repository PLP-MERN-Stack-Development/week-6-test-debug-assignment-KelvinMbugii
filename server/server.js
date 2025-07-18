// server.js
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

// Get Express app from app.js
const app = require("./app");

// Initialize server using Express app
const server = http.createServer(app);

// Normalize CLIENT_URL (remove trailing slashes)
const CLIENT_URL = (process.env.CLIENT_URL || "http://localhost:5173").replace(
  /\/+$/,
  ""
);

// Setup Socket.io with proper CORS
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io handlers
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(` User ${userId} joined room`);
  });

  socket.on("private-message", ({ senderId, receiverId, content }) => {
    io.to(receiverId).emit("private-message", {
      senderId,
      content,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
