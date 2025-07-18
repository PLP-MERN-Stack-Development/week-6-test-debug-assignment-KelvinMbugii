# React + Vite

# Chat App Client (Frontend)

This is the frontend of a real-time chat application built using **React**, **Tailwind CSS**, **Shadcn/UI**, and **Socket.io-client**. It connects to the backend server via REST APIs and WebSockets to support instant messaging, user authentication, and more.

---

## 🌟 Features

- Responsive chat UI styled like WhatsApp
- Real-time messaging using Socket.io
- Avatar and online status indicators
- Emoji picker and image/file upload support
- Read receipts and typing indicators
- User authentication with JWT
- Context-based theme management
- Notifications and toast alerts

---

## 📁 Project Structure

client/
|__ coverage/
├── public/
├── src/
│ ├── assets/  
│ ├── components/ 
│ ├── pages/ 
│ ├── tests
│ ├── utils/ # Helper functions
│ ├── App.jsx # Root app component
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind CSS
├── .env # Frontend environment variables
configuration
├── postcss.config.js # PostCSS configuration
└── package.json

---
## Installation
1. Navigate to the 'client/' folder:

```bash
cd client
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

## Technologies used
React

Vite

Axios

Socket.io-client

Tailwind CSS

Shadcn/UI

Lucide-react

Emoji-mart

Jest (for testing)

## Screenshots
week-6-client-test.png