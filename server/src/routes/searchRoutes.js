import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import ProjectTag from "../models/ProjectTagModel.js";
import Like from "../models/LikeModel.js";

const router = express.Router();

//search user
router.get("/user",verifyToken, async (req, res) => {
    
  try {
      const { query } = req.query;
      if (!query) return res.status(400).json({ message: "query is required" });

      const users = await User.find({
          $or: [
              { fullName: { $regex: `\\b${query}`, $options: "i" } }, // Match words starting with query
              { username: { $regex: `^${query}`, $options: "i" } } 
          ]
      })
    //   .limit(7);  // Limit results to 7 users
    //   .select("username avatar fullName _id")

      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

//search projects
router.get("/project", verifyToken, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "query is required" });

    const userId = req.user?.userId; // Get user ID from request

    // Find projects matching the search query
    const projects = await Project.find({
      isHidden: false,
      $or: [{ title: { $regex: `\\b${query}`, $options: "i" } }],
    })
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar");

    if (!projects.length) return res.json([]); // Return empty array if no results

    const projectIds = projects.map((p) => p._id);

    // Fetch project tags
    const projectTags = await ProjectTag.find({ projectId: { $in: projectIds } })
      .populate("tagId", "name");

    // Fetch like counts
    const likeCounts = await Like.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } },
    ]);

    // Fetch user's liked projects
    const userLikes = userId
      ? await Like.find({ projectId: { $in: projectIds }, userId }).select("projectId")
      : [];

    // Map like counts
    const likeCountMap = {};
    likeCounts.forEach(({ _id, count }) => {
      likeCountMap[_id.toString()] = count;
    });

    // Map user's liked projects
    const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));

    // Map tags to projects
    const tagsMap = {};
    projectTags.forEach((projectTag) => {
      const projectIdStr = projectTag.projectId.toString();
      if (!tagsMap[projectIdStr]) tagsMap[projectIdStr] = [];

      if (projectTag.tagId && projectTag.tagId.name) {
        projectTag.tagId.name.split(",").forEach((part) => {
          const trimmed = part.trim();
          if (trimmed) tagsMap[projectIdStr].push(trimmed);
        });
      }
    });

    // Attach tags, likeCount, and isLiked to projects
    const projectsWithDetails = projects.map((project) => {
      const projectObj = project.toObject();
      const projectId = project._id.toString();

      return {
        ...projectObj,
        tags: tagsMap[projectId] || [],
        likeCount: likeCountMap[projectId] || 0,
        isLiked: userLikedSet.has(projectId),
      };
    });

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    console.error("Error fetching searched projects:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;