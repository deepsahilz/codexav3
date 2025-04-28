import express from "express";
// import {fetchUsers} from "../controllers/adminControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import {verifyAdmin} from "../middlewares/authMiddleware.js";
import {fetchUsers, banUser, unbanUser, deleteUser,fetchStats,fetchProjects,deleteProject} from "../controllers/adminControllers.js";

const router = express.Router();

//USER RELATED

router.get("/stats",verifyToken,verifyAdmin,fetchStats);
router.get("/users",verifyToken,verifyAdmin,fetchUsers);
router.put("/user/:userId/ban",verifyToken,verifyAdmin,banUser);
router.put("/user/:userId/unban",verifyToken,verifyAdmin,unbanUser);
// router.post("/user/:userId",verifyToken,verifyAdmin,suspendUser);
router.delete("/user/:userId/delete",verifyToken,verifyAdmin,deleteUser);

//PROJECT RELATED
router.get("/projects",verifyToken,verifyAdmin,fetchProjects);
router.delete("/project/:projectId/",verifyToken,verifyAdmin,deleteProject);

//COMMENTS
// router.delete("/comment/:commentId/",verifyToken,verifyAdmin,deleteComment);

//SEARCH
// router.get("/search",verifyToken,verifyAdmin,deleteComment);
// const { query } = req.query;

export default router;
