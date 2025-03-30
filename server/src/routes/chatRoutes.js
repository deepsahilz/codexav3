import express from "express";
import { createChat, getUserChats } from "../controllers/chatController.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/", verifyToken, getUserChats);

export default router;
