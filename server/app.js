// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Normalize CLIENT_URL (if needed in your API configuration)
const CLIENT_URL = (process.env.CLIENT_URL || "http://localhost:5173").replace(
  /\/+$/,
  ""
);

const app = express();

// Express CORS middleware
app.use(
  cors({
    origin: CLIENT_URL, // or 'http://localhost:5173'
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Health Check Route
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

module.exports = app;
