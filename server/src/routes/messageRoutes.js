import express from "express";
import { sendMessage, getChatMessages } from "../controllers/messageController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:chatId", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getChatMessages);

export default router;
