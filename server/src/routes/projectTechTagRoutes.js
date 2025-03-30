import express from "express";
import { addProjectTech, removeProjectTech, getProjectTech } from "../controllers/projectTechTagsController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:projectId", verifyToken, addProjectTech);
router.get("/:projectId", getProjectTech);
router.delete("/:projectId/:techStackId", verifyToken, removeProjectTech);

export default router;
