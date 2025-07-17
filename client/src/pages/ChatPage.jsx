import React, { useEffect, useState } from "react";
import API from "../utils/api"; 
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/users");
        console.log("Fetched users response:", res.data);

        const fetchedUsers = res.data?.users || [];
        const filteredUsers = fetchedUsers.filter((u) => u._id !== user._id);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]); 
      }
    };

    if (user) fetchUsers();
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r overflow-y-auto">
        {Array.isArray(users) &&
          users.map((u) => (
            <ChatList
              key={u._id}
              user={u}
              onSelect={() => setSelectedUser(u)}
            />
          ))}
      </div>
      <div className="w-2/3">
        {selectedUser ? (
          <ChatWindow user={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
