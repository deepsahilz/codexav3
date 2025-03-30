import express from "express";
import { getSearchedTags } from "../controllers/tagControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", verifyToken, createTechStack);
router.get("/",verifyToken,getSearchedTags );

export default router;
