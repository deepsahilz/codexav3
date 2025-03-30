import express from "express";
import {
    getUserProfile,
    updateUser,
    deleteUser,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
    getUserProjects,
    addSearchHistory,
    removeSearchHistoryItem,
    getSearchHistory
} from "../controllers/userControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";

const router = express.Router();
//Listen:specefic routes come before param routes.
//api/user/:userId/projects

router.get("/search-history", verifyToken, getSearchHistory);
router.post("/search-history", verifyToken, addSearchHistory); 
router.delete("/search-history", verifyToken, removeSearchHistoryItem); 


router.get("/:username/projects", verifyToken, getUserProjects); // ✔️fetch user projects
router.get("/:username",verifyToken, getUserProfile); // ✔️Get user profile
router.post("/:username", verifyToken, updateUser); // ✔️Update user
router.delete("/:userId", verifyToken, deleteUser); // Delete user


router.post("/:userId/follow", verifyToken, followUser); // Follow a user
router.delete("/:userId/follow", verifyToken, unfollowUser); // Unfollow a user

router.get("/:userId/followers", getFollowers); // Get user's followers
router.get("/:userId/following", getFollowing); // Get user's following list




export default router;




