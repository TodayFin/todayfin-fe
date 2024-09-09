"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

const ChatRoom = ({ newsId }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const currentUserId = 1;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const connectSocket = useCallback(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}:5002`, {
      rejectUnauthorized: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
      socketRef.current.emit("joinChat", newsId);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketRef.current.on("messageList", (messages) => {
      setChat(messages);
      console.log("Received message list:", messages);
    });

    socketRef.current.on("message", (newMessage) => {
      console.log("Received new message:", newMessage);
      const curMessage = {
        newsId: newsId,
        authorId: currentUserId,
        content: newMessage,
        createdAt: new Date(),
      };
      setChat((prevChat) => [...prevChat, curMessage]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [newsId]);

  useEffect(() => {
    const cleanup = connectSocket();
    return cleanup;
  }, [connectSocket]);

  const handleSend = useCallback(() => {
    if (message.trim() && socketRef.current && isConnected) {
      const newMessage = {
        newsId: newsId,
        authorId: currentUserId,
        content: message,
        createdAt: new Date(),
      };
      socketRef.current.emit("message", newMessage);
      setMessage("");
      console.log("Message sent:", newMessage);
    } else {
      console.error("Cannot send message. Socket not connected.");
      // TODO : 사용자에게 연결 문제를 알리는 UI 로직 추가
    }
  }, [message, newsId, isConnected, currentUserId]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">채팅방</h2>
      {!isConnected && (
        <div className="text-red-500 mb-2">
          서버와의 연결이 끊어졌습니다. 재연결 중...
        </div>
      )}
      <div className="mb-4 max-h-96 overflow-y-auto">
        {chat.map((comment, index) =>
          comment.authorId === currentUserId ? (
            <SentMessage
              key={index}
              user={comment.user}
              timestamp={comment.createdAt}
              text={comment.content}
            />
          ) : (
            <ReceivedMessage
              key={index}
              user={comment.user}
              timestamp={comment.createdAt}
              text={comment.content}
            />
          )
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={!isConnected}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
