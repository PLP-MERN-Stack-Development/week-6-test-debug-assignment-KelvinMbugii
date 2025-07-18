import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("chat-user"));
  return user ? children : <Navigate to="/login" replace />;
}
