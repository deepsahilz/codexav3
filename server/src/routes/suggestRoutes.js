import express from "express"; 
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import Tag from "../models/TagModel.js";

const router = express.Router();

// Get suggestions for project, user, or tag
router.get("/suggestions", verifyToken, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "query is required" });

    // Build a regex pattern to match initials or partial words
    const regex = new RegExp(`^${query}`, 'i'); // Starts with the query (case insensitive)

    // Search in User collection (by username or fullName)
    const users = await User.find({
      $or: [
        { username: { $regex: regex } }, // Match usernames that start with the query (initials match)
        { fullName: { $regex: regex } }  // Match full names that start with the query (initials match)
      ]
    })
      .select("username fullName")
      .limit(7);  // Limit results to 7 users

    // Search in Project collection (by project name or description)
    const projects = await Project.find({
      $or: [
        { name: { $regex: regex } },   // Match project names that start with the query (initials match)
        { description: { $regex: regex } }  // Match project descriptions that start with the query (initials match)
      ]
    })
      .select("name")
      .limit(7);  // Limit results to 7 projects

    // Search in Tag collection (by tag name)
    const tags = await Tag.find({
      name: { $regex: regex }  // Match tag names that start with the query (initials match)
    })
      .select("name")
      .limit(7);  // Limit results to 7 tags

    // Combine all results into a single array of strings, filtering out null/undefined values
    let suggestions = [
      ...users.map(user => user.username),
      ...users.map(user => user.fullName),
      ...projects.map(project => project.name),
      ...tags.map(tag => tag.name)
    ].filter(name => name);  // Remove null, undefined, or empty string values

    // Shuffle the results and limit to 10-11 total suggestions
    suggestions = suggestions.sort(() => Math.random() - 0.5).slice(0, 11);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
