import React, { useState } from "react";

const ChatRoom = ({ comments }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(comments);

  const handleSend = () => {
    if (message.trim()) {
      setChat([
        ...chat,
        {
          userId: 1,
          user: "user1",
          text: message,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">채팅방</h2>
      <div className="mb-4">
        {chat.map((comment, index) => (
          <div key={index} className="mb-4 flex items-start">
            <div className="mr-4">
              <img
                src="https://avatars.githubusercontent.com/u/86763857?v=4"
                alt={comment.user}
                className="rounded-full w-12 h-12 object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-bold mr-2">{comment.user}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 border p-4 rounded-lg w-fit max-w-[70%]">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
