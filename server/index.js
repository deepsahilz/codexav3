import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//new for sockets
import { createServer } from "http";
import { Server } from "socket.io";
// Load environment variables first
dotenv.config();

import connectDB from "./src/dbconfig/db.js";
connectDB();

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import utilRoutes from "./src/routes/utilRoutes.js";
import tagRoutes from "./src/routes/tagRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";
import suggestRoutes from "./src/routes/suggestRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js"
import {initSocket,getIO} from "./socket.js";


const app = express();

//SOCKETS
const server = createServer(app);
initSocket(server);
const io = getIO();



const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions)); 
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//_____________________________________________________________________________


app.get("/", (req, res) => res.send("server is working"));


app.use("/api/auth", authRoutes);
//POST--> api/auth/signup   ✅
//POST--> api/auth/login    ✅
//POST--> api/auth/logout   ✅

app.use("/api/user", userRoutes);
//GET    -->api/user/:username            ✅ get user profile
//PUT    -->api/user/:username            ✅ update/edit user profile
//DELETE -->api/user/:username            🚀 delete user profile
//GET    -->api/user/:userId/followers    ✅ get user's followers
//GET    -->api/user/:userId/following    ✅ get user's following
//POST   -->api/user/:userId/follow       ✅ follow user 
//DELETE -->api/user/:userId/follow       ✅ unfollow user
//GET    -->api/user/:userId/projects     ✅ get all projects of user(with preview,likeCount,commentCount,Tags)

app.use("/api/tags", tagRoutes);     
app.use('/api/utils', utilRoutes);

app.use("/api/search",searchRoutes);      //✅
app.use("/api/suggest",suggestRoutes);    //✅

app.use("/api/project", projectRoutes);     
app.use("/api/comment", commentRoutes);     
//GET    -->api/project                      ✔️ get all projects for home feed
//POST   -->api/project                      ✔️ create a project
//GET    -->api/project/:projectid           🚀 get a single project(with all data)
//POST   -->api/project/:projectId/like      ✔️ like a project
//DELETE -->api/project/:projectId/like      ✔️ unlike a project
//PUT    -->api/project/:projectid           🚀 edit a project


//GET    -->api/project/:projectId/comment   ✅ get all comments of a project(with like,comment counts)
//POST   -->api/project/:projectId/comment   ✅ comment on a project

// app.use("/api/comment", commentRoutes);
//POST   -->api/comment/:commentId/like      ✔️ like a comment
//DELETE -->api/comment/:commentId/like      ✔️ unlike a comment
//DELETE -->api/comment/:commentId           ✔️ delete a comment    
//POST   -->api/comment/:commentId/reply     ✔️ reply to a comment

// app.use("/api/chat", chatRoutes);      
//POST   -->api/chat                           ✔️ start a chat
//GET    -->api/chat/                          ✔️ get a chat
//DELETE -->api/chat/:chatId                   ✔️ delete a chat-----
//POST   -->api/chat/group                     ✔️ create group chat
//PUT    -->api/chat/grouprename               ✔️ rename group
//PUT    -->api/chat/groupadd                  ✔️ add user to group
//PUT    -->api/chat/groupremove               ✔️ remove user from group
//GET    -->api/chat/:chatid/messages          ✔️ get chat messages(with message reactions)


// app.use("/api/messages", messageRoutes);    
//DELETE -->api/chat/:chatid/messages/:messageId            delete message
//DELETE -->api/messages/:messageId                      ✔️ delete message

//POST   -->api/message/                                 ✔️ send message
//POST   -->api/message/:messageId/reaction              ✔️ react emoji on a message
//GET    -->api/message/:messageId/reaction              ✔️ get all reactions on a message(with reactors data)

//DELETE    -->api/message/:messageId/reaction/:reactionId        ✔️ delete emoji on a message
//DELETE    -->api/messageReaction/:MessageReactionId             ✔️ delete emoji on a message












// app.use("/api/notifications", notificationRoutes); // User notifications

// app.use("/api/project-techTags", projectTechTagRoutes); // Link project with tech stack
// app.use("/api/user-skillTags", userSkillTagRoutes);    // Link user with skills
// app.use("/api/tags", tagRoutes);      // Manage tech stacks


//search routes
// app.use("/api/search/search?query = "react");      
// app.use("/api/search/projects/search?query = "react");      
// app.use("/api/search/users/search?query = "react");      





// Error Middleware (Must be last)
app.use(errorMiddleware);


// Start server
const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
