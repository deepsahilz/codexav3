import { Server } from "socket.io";

let onlineUsers = new Map();
let io;  // Declare io outside initSocket

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      for (let [key, value] of onlineUsers.entries()) {
        if (value === socket.id) onlineUsers.delete(key);
      }
    });
  });

  return { io, onlineUsers };
};

// Make io and onlineUsers accessible
export { io, onlineUsers };
