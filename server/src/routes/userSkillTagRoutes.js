import express from "express";
import { addUserSkill, removeUserSkill, getUserSkills } from "../controllers/userSkillTagsController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addUserSkill);
router.get("/:userId", getUserSkills);
router.delete("/:userId/:techStackId", verifyToken, removeUserSkill);

export default router;
