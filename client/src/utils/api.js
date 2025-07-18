import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true, 
});

//  Attach token to headers if present
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("chat-user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;