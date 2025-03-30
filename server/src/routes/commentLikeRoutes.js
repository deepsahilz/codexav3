import express from "express";
import { likeComment, unlikeComment } from "../controllers/commentLikeController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:commentId/like", verifyToken, likeComment);
router.delete("/:commentId/unlike", verifyToken, unlikeComment);

export default router;
