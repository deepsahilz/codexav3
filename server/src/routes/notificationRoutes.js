import express from "express";
import { getUserNotifications, markNotificationRead } from "../controllers/notificationController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getUserNotifications);
router.put("/:notificationId/read", verifyToken, markNotificationRead);

export default router;
