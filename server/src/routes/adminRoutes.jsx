import express from "express";
// import {fetchUsers} from "../controllers/adminControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import verifyAdmin from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout",verifyToken,logout);
// router.get("/me",verifyToken,checkAuth);

//USER RELATED
router.get("/users",verifyToken,verifyAdmin,fetchUsers);
router.post("/user/:userId",verifyToken,verifyAdmin,banUser);
router.post("/user/:userId",verifyToken,verifyAdmin,unbanUser);
router.post("/user/:userId",verifyToken,verifyAdmin,suspendUser);
router.delete("/user/:userId",verifyToken,verifyAdmin,deleteUser);

//PROJECT RELATED
router.get("/projects",verifyToken,verifyAdmin,fetchProjects);
router.delete("/project/:projectId/",verifyToken,verifyAdmin,deleteProject);

//COMMENTS
router.delete("/comment/:commentId/",verifyToken,verifyAdmin,deleteComment);

//SEARCH
router.get("/search",verifyToken,verifyAdmin,deleteComment);
// const { query } = req.query;

export default router;
