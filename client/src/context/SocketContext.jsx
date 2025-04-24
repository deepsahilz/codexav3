import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "./UserContextProvider";
import axiosInstance from "../utils/axiosInstance";

const SocketContext = createContext();

const SocketProviderComponent = ({ children }) => {
  console.log("rendering socket context");

  const { user, isLoggedIn } = useUserContext();
  const [onlineUsers,setOnlineUsers] = useState([]);
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  

  useEffect(() => {
    console.log("entered socket useEffect");
    if (!isLoggedIn) return;

    console.log("running socket useEffect");

    const fetchInitialNotifications = async () => {
      try {
        const res = await axiosInstance.get("/api/user/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.log("Failed to load notifications", err);
      }
    };
    const fetchOnlineUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/utils/online-users");
        setOnlineUsers(res.data);  // Set initial online users
      } catch (err) {
        console.log("Failed to load online users", err);
      }
    };

    fetchInitialNotifications();
    fetchOnlineUsers();
    socketRef.current = io("http://localhost:5000");

    // Send user ID to server once connected
    socketRef.current.on("connect", () => {
      console.log("🔄Socket connected with ID:", socketRef.current.id);
      if (user) {
        socketRef.current.emit("join", user.id);
      }
    });

    socketRef.current.on("new-notification", (notification) => {
      console.log("new notification received:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });
    
    socketRef.current.on("user-online", (userId) => {
      setOnlineUsers((prev) => [...prev, userId]);
    });

    socketRef.current.on("user-offline", (userId) => {
      setOnlineUsers((prev) => prev.filter(id => id !== userId));
    });

    return () => {
      socketRef.current.disconnect();
      console.log("socket disconnected while unmounting");
    };
  }, [isLoggedIn, user?.id]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, notifications,onlineUsers,isTyping,setIsTyping, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

// Memoizing the SocketProvider component to prevent unnecessary re-renders
export const SocketProvider = React.memo(SocketProviderComponent);

export const useSocket = () => useContext(SocketContext);
