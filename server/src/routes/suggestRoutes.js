import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import Tag from "../models/TagModel.js";
const router = express.Router();


//get project suggestions
router.get("/project",verifyToken, async (req, res) => {
  try {
      const { query} = req.query;
      if (!query) return res.status(400).json({ message: "query is required" });

      const projects = await Tag.find({
          $or: [
              { name: { $regex: `\\b${query}`, $options: "i" } },
            //   { username: { $regex: `^${username}`, $options: "i" } } 
          ]
      })
    .select("name")
    .limit(7);  // Limit results to 7 users

    // res.json(projects);
    res.json(projects.map(p => p.name));
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

export default router;