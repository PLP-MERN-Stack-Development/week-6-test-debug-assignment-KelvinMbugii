# Chat App Server (Backend)

This is the backend server for a real-time chat application. It is built using **Node.js**, **Express**, **MongoDB**, and **Socket.io** for real-time communication.

---

## 🚀 Features

- Express server with modular routing
- MongoDB connection using Mongoose
- Real-time messaging with Socket.io
- Environment-based configuration using dotenv
- CORS support for frontend communication
- Scalable and production-ready structure

---

## 📁 Project Structure

server/
├── app.js # Express app instance and middleware setup
├── server.js # Main server file with HTTP, Socket.io, MongoDB
├── controllers/ # Request/response logic (e.g., auth, chat, users)
├── models/ # Mongoose schemas and models
├── routes/ # API routes
├── .env # Environment variables (not committed)
└── package.json # Backend dependencies

---
## prerequisites
- Node.js
- MongoDB URI
- '.env'

## Installation
```bash
cd server
npm install
```
2. Running the App
```bash
npm run dev
```

3. Testing(Jest)
```bash
npm test
```

## Screenshot
week-6-server-test.png
