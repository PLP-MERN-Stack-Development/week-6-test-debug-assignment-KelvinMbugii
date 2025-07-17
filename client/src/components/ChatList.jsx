import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import clsx from "clsx";

export default function ChatList({
  users,
  currentUser,
  onSelectUser,
  activeUser,
}) {
  return (
    <div className="w-1/3 border-r h-full overflow-y-auto">
      <h2 className="text-lg font-semibold p-4 border-b">Contacts</h2>
      {users.map(
        (user) =>
          user._id !== currentUser._id && (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={clsx(
                "flex items-center p-4 cursor-pointer hover:bg-gray-100",
                activeUser?._id === user._id && "bg-blue-100"
              )}
            >
              <div className="relative mr-3">
                <img
                  src={user.avatar || "/avatar.png"}
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={clsx(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white",
                    user.online ? "bg-green-500" : "bg-gray-400"
                  )}
                />
              </div>
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">
                  {user.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
}
