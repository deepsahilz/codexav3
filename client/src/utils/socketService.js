// hooks/useSocket.js
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:5000"; // change to your backend

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Prevent multiple connections
    if (!socketRef.current) {
      console.log("Connecting socket...");
      socketRef.current = io(SOCKET_SERVER_URL, {
        transports: ['websocket'], // optional, but reduces fallbacks
        withCredentials: true,     // if you're using cookies/auth
      });

      // Optional: Log connection status
      socketRef.current.on('connect', () => {
        console.log("Socket connected:", socketRef.current.id);
      });

      socketRef.current.on('disconnect', () => {
        console.log("Socket disconnected");
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log("Socket disconnected on unmount");
      }
    };
  }, []);

  return socketRef.current;
};

export default useSocket;
