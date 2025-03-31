import express from "express";
import { createProject, getProject,getAllProjects, updateProject, deleteProject,likeProject,unlikeProject, addComment, getParentComments } from "../controllers/projectControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import projectFilesUpload from "../middlewares/projectFilesUpload.js";
const router = express.Router();


//✔️ GET----> /api/project
router.get("/",verifyToken,getAllProjects); 

//✔️ POST---> /api/project
router.post("/", verifyToken,projectFilesUpload,createProject);

//✔️ POST---> /api/project/:projectId/like
router.post("/:projectId/like", verifyToken,likeProject);

//✔️ DELETE---> /api/project/:projectId/like
router.delete("/:projectId/like", verifyToken,unlikeProject);


//written here
router.get("/:projectId/comment", verifyToken,getParentComments);
router.post("/:projectId/comment", verifyToken,addComment);




router.get("/:projectId",verifyToken, getProject);
router.put("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);

export default router;
