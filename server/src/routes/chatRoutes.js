import express from "express";
import { createChat, getUserChats } from "../controllers/chatControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/new", verifyToken, createChat);
router.get("/", verifyToken, getUserChats);

export default router;