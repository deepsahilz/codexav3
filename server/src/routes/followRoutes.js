import express from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/followController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:userId/follow", verifyToken, followUser);
router.delete("/:userId/unfollow", verifyToken, unfollowUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowing);

export default router;
