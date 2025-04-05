import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import ProjectTag from "../models/ProjectTagModel.js";
import Tag from "../models/TagModel.js";
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

    const userId = req.user?.userId;

    // 1. Find tags that match the query
    const matchingTags = await Tag.find({
      name: { $regex: query, $options: "i" }
    });
    const tagIds = matchingTags.map(tag => tag._id);

    // 2. Get projectIds with those tags
    const matchingProjectTags = await ProjectTag.find({
      tagId: { $in: tagIds }
    });
    const projectIdsFromTags = matchingProjectTags.map(pt => pt.projectId);

    // 3. Find projects that match either title or tags
    const projects = await Project.find({
      isHidden: false,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { _id: { $in: projectIdsFromTags } }
      ]
    })
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar");

    if (!projects.length) return res.json([]);

    const projectIds = projects.map((p) => p._id);

    // 4. Get tags for those projects
    const projectTags = await ProjectTag.find({ projectId: { $in: projectIds } })
      .populate("tagId", "name");

    // 5. Get like counts
    const likeCounts = await Like.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } },
    ]);

    // 6. Get user's liked projects
    const userLikes = userId
      ? await Like.find({ projectId: { $in: projectIds }, userId }).select("projectId")
      : [];

    const likeCountMap = {};
    likeCounts.forEach(({ _id, count }) => {
      likeCountMap[_id.toString()] = count;
    });

    const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));

    // 7. Map tags to each project
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

    // 8. Attach all details
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