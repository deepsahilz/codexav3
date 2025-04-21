import express from "express";
import { createChat, getMessages, getUserChats, markAllMessagesRead, sendMessage, } from "../controllers/chatControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/", verifyToken, getUserChats);
router.get("/:chatId/messages", verifyToken, getMessages);
router.post("/:chatId/messages", verifyToken, sendMessage);
router.post("/:chatId/mark-read",verifyToken,markAllMessagesRead );


export default router;