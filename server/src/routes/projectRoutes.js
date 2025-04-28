import express from "express";
import { createProject, getProject,getAllProjects, updateProject,saveProject,unsaveProject, deleteProject,likeProject,unlikeProject, addComment, getParentComments, getFollowedProjects } from "../controllers/projectControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";
import projectFilesUpload from "../middlewares/projectFilesUpload.js";
const router = express.Router();


//✔️ GET----> /api/project
router.get("/",verifyToken,getAllProjects); 
router.get("/followed",verifyToken,getFollowedProjects); 

//✔️ POST---> /api/project
router.post("/", verifyToken,projectFilesUpload,createProject);

//✔️ POST---> /api/project/:projectId/like
router.post("/:projectId/like", verifyToken,likeProject);

//✔️ DELETE---> /api/project/:projectId/like
router.delete("/:projectId/like", verifyToken,unlikeProject);


//written here
router.get("/:projectId/comment", verifyToken,getParentComments);
router.post("/:projectId/comment", verifyToken,addComment);

//new written here
router.post("/:projectId/save",verifyToken,saveProject);
router.delete("/:projectId/save",verifyToken,unsaveProject);


router.get("/:projectId",verifyToken, getProject);
router.put("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);

export default router;
