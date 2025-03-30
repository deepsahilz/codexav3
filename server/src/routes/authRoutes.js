import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/authControllers.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",verifyToken,logout);
router.get("/me",verifyToken,checkAuth);

export default router;
