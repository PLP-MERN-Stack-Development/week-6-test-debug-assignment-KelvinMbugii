import { useEffect, useState, useRef } from "react";
import { socket } from "../utils/socket";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import clsx from "clsx";

export default function ChatWindow({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    socket.emit("join-private", { to: selectedUser._id });

    socket.on("private-message", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    socket.on("typing", ({ from }) => {
      if (from === selectedUser._id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1000);
      }
    });

    return () => {
      socket.off("private-message");
      socket.off("typing");
    };
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    const messageData = {
      to: selectedUser._id,
      from: currentUser._id,
      content: msg,
      timestamp: new Date(),
    };
    socket.emit("private-message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setMsg("");
    setShowEmoji(false);
  };

  return (
    <div className="w-2/3 h-full flex flex-col">
      <div className="border-b px-4 py-2 font-semibold">{selectedUser?.username}</div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={clsx(
              "max-w-xs p-2 rounded-lg",
              m.from === currentUser._id ? "bg-blue-600 text-white self-end ml-auto" : "bg-gray-200"
            )}
          >
            <p>{m.content}</p>
            <span className="text-xs block text-right mt-1 opacity-70">{new Date(m.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        {typing && (
          <div className="text-sm text-gray-400 italic">Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t flex items-center gap-2">
        <button onClick={() => setShowEmoji(!showEmoji)} className="text-2xl">😊</button>
        {showEmoji && (
          <div className="absolute bottom-16 z-10">
            <Picker data={data} onEmojiSelect={(e) => setMsg((prev) => prev + e.native)} />
          </div>
        )}
        <input
          className="flex-1 border px-3 py-1 rounded"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            socket.emit("typing", { to: selectedUser._id, from: currentUser._id });
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
