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
    getSearchHistory,
    getUserSavedProjects,
    getNotifications,
    markAllAsRead
} from "../controllers/userControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";

const router = express.Router();
//Listen:specefic routes come before param routes.
//api/user/:userId/projects

router.get("/search-history", verifyToken, getSearchHistory);
router.post("/search-history", verifyToken, addSearchHistory); 
router.delete("/search-history", verifyToken, removeSearchHistoryItem); 

router.get("/notifications", verifyToken,getNotifications); //✅ Get user's notification list
router.post("/notifications/mark-read", verifyToken,markAllAsRead); //✅ mark all notifications as read

router.get("/:username/projects", verifyToken, getUserProjects); // ✔️fetch user projects
router.get("/:username/saved-projects", verifyToken, getUserSavedProjects); // ✔️fetch user projects
router.get("/:username",verifyToken, getUserProfile); // ✔️Get user profile
router.post("/:username", verifyToken, updateUser); // ✔️Update user
router.delete("/:userId", verifyToken, deleteUser); // Delete user

//follow routes working
router.post("/:userId/follow", verifyToken, followUser); //✅ Follow a user
router.delete("/:userId/follow", verifyToken, unfollowUser); //✅ Unfollow a user
router.get("/:username/followers", getFollowers); //✅ Get user's followers
router.get("/:username/following", getFollowing); //✅ Get user's following list






export default router;




