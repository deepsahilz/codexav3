import { Server } from "socket.io";

const onlineUsers = new Map(); // userId -> socketId

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // You can restrict this to your frontend domain
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🔄 New client connected:", socket.id);

    // When client sends their userId
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`🔄 userId "${userId}" connected with socketId "${socket.id}"`);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};

export const getIO = () => io;
export const getOnlineUsers = () => onlineUsers;
