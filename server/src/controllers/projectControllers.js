import Project from "../models/ProjectModel.js";
import ProjectTag from "../models/ProjectTagModel.js";
import Tag from "../models/TagModel.js";
import Like from "../models/LikeModel.js";
import Comment from "../models/CommentModel.js";
import CommentLike from "../models/CommentLikeModel.js";
import Save from "../models/SavedProjectModel.js";



export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const projects = await Project.find({ isHidden: false })
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar")
      .sort({ createdAt: -1 });

    const projectIds = projects.map((project) => project._id);

    const [projectTags, likeCounts, userLikes, commentCounts, savedCounts, userSaves] = await Promise.all([
      ProjectTag.find({ projectId: { $in: projectIds } }).populate("tagId", "name"),
      Like.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } }
      ]),
      userId ? Like.find({ projectId: { $in: projectIds }, userId }).select("projectId") : [],
      Comment.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } }
      ]),
      Save.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } }
      ]),
      userId ? Save.find({ projectId: { $in: projectIds }, userId }).select("projectId") : []
    ]);

    const likeCountMap = {};
    likeCounts.forEach(({ _id, count }) => {
      likeCountMap[_id.toString()] = count;
    });

    const commentCountMap = {};
    commentCounts.forEach(({ _id, count }) => {
      commentCountMap[_id.toString()] = count;
    });

    const savedCountMap = {};
    savedCounts.forEach(({ _id, count }) => {
      savedCountMap[_id.toString()] = count;
    });

    const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));
    const userSavedSet = new Set(userSaves.map((save) => save.projectId.toString()));

    const tagsMap = {};
    projectTags.forEach((projectTag) => {
      const id = projectTag.projectId.toString();
      if (!tagsMap[id]) tagsMap[id] = [];

      if (projectTag.tagId?.name) {
        projectTag.tagId.name.split(",").forEach((part) => {
          const trimmed = part.trim();
          if (trimmed) tagsMap[id].push(trimmed);
        });
      }
    });

    const projectsWithDetails = projects.map((project) => {
      const projectId = project._id.toString();
      return {
        ...project.toObject(),
        tags: tagsMap[projectId] || [],
        likeCount: likeCountMap[projectId] || 0,
        commentCount: commentCountMap[projectId] || 0,
        savedCount: savedCountMap[projectId] || 0,
        isLiked: userLikedSet.has(projectId),
        isSaved: userSavedSet.has(projectId),
      };
    });

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    console.error("Error fetching home feed projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};


export const getProject = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const projectId = req.params.projectId;
    // console.log("user here-->",userId);
    // console.log("project here-->",projectId);
    
    const project = await Project.findById({_id:projectId})
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar")
      

    // Fetch tags for each project
    const projectTags = await ProjectTag.find({projectId})
      .populate("tagId", "name");
      
      // Fetch like counts for each project
      const likeCount = await Like.aggregate([
        { $match: { _id: projectId} },
        { $group: { _id: projectId, count: { $sum: 1 } } },
      ]);
      
      // Fetch user's liked projects
      const userLikes = userId? await Like.find({ projectId, userId }).select("projectId")
      : [];
      
    const projectObj = project.toObject();
    const projectsWithDetails = {
        ...projectObj,
        tags: projectTags.map(pt => pt.tagId?.name.split(",").map(tag => tag.trim())).flat() || [],
        likeCount: likeCount || 0, // Default to 0 if no likes
        isLiked: userLikes, // Check if user has liked the project
      }

      console.log(projectsWithDetails)
    res.status(200).json(projectsWithDetails);
  } catch (error) {
    console.error("Error fetching home feed projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};
export const createProject = async (req, res) => {
  console.log(req.body);
  try {
    const { 
      title, 
      description, 
      liveLink,
      type, 
      codeLink, 
      projectStatus
    } = req.body;
    
    const collaborators = req.body.collabs?.map(collab => ({
      userId: collab.userId,
      status: "pending"
    })) || [];
      

    // Process uploaded thumbnail
    let thumbnailPath = '';
    if (req.files && req.files.thumbnail) {
      thumbnailPath = req.files.thumbnail[0].path;
    }
    
    // Process uploaded media files
    const mediaFilePaths = [];
    if (req.files && req.files.mediaFiles) {
      req.files.mediaFiles.forEach(file => {
        mediaFilePaths.push(file.path);
      });
    }
    
    // Create new project
    const newProject = new Project({
      title,
      type,
      description,
      AuthorId: req.user.userId, 
      codeLink,
      liveLink,
      thumbnail: thumbnailPath,
      mediaFiles: mediaFilePaths,
      isInProgress: projectStatus === 'inProgress',
      collaborators
    });
    
    // Save the project
    const savedProject = await newProject.save();
    
    
    // Process tags if available
    if (req.body.tags) {
      // Handle indexed format from FormData
      const tagKeys = Object.keys(req.body).filter(key => key.startsWith('tags'));
      
      for (const key of tagKeys) {
        const tagValue = req.body[key];
        
        // Ensure tagValue is a string before calling toLowerCase
        const tagName = String(tagValue).trim();
        
        if (tagName) {
          // Find or create the tag
          let tag = await Tag.findOne({ name: tagName.toLowerCase() });
          
          if (!tag) {
            tag = new Tag({ name: tagName.toLowerCase() });
            await tag.save();
          }
          
          // Create project-tag association
          const projectTag = new ProjectTag({
            projectId: savedProject._id,
            tagId: tag._id
          });
          
          await projectTag.save();
        }
      }
    }
    
    res.status(201).json({
      success: true,
      data: savedProject,
      message: "Project created successfully"
    });
    
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};
export const likeProject = async (req, res) => {
    try {
        const {projectId } = req.params;
        const userId = req.user.userId;
        console.log(projectId,userId);

        // Check if the like already exists
        const existingLike = await Like.findOne({ userId, projectId });
        if (existingLike) {
            return res.status(400).json({ message: "Already liked this project" });
        }
        // Create a new like entry
        const like = new Like({ userId, projectId });
        await like.save();

        res.status(201).json({ message: "Project liked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const unlikeProject = async (req, res) => {
  try {
      const { projectId } = req.params;
      const userId = req.user.userId;

      // Check if the like exists
      const existingLike = await Like.findOne({ userId, projectId });
      if (!existingLike) {
          return res.status(400).json({ message: "You haven't liked this project" });
      }

      // Remove the like entry
      await Like.deleteOne({ userId, projectId });

      res.status(200).json({ message: "Project unliked successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

//same for comment and reply
export const addComment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { projectId } = req.params;
        const { parentId, content, gifUrl } = req.body;

        if (!userId || !projectId) {
            return res.status(400).json({ message: "Bad Request" });
        }

        if (!content && !gifUrl) {
            return res.status(400).json({ message: "Content or GIF is required." });
        }

        // Create a new comment
        const newComment = new Comment({
            parentId: parentId || null,
            userId,
            projectId,
            content: content || null,
            gifUrl: gifUrl || null,
        });

        await newComment.save();
        
        

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const getParentComments = async (req, res) => {
  try {
      const { projectId } = req.params;

      if (!projectId) {
          return res.status(400).json({ message: "Project ID is required." });
      }

      const comments = await Comment.find({ projectId , parentId: null})
          .populate("userId", "username avatar") // Adjust fields as needed
          // .populate("parentId") // If needed
          .sort({ createdAt: -1 })
          .lean(); // Converts to plain JavaScript objects

      // Fetch likes for each comment
      const commentIds = comments.map(comment => comment._id);
      const likes = await CommentLike.aggregate([
          { $match: { commentId: { $in: commentIds } } },
          { $group: { _id: "$commentId", likeCount: { $sum: 1 } } }
      ]);

      // Map likes to comments
      const likeMap = new Map(likes.map(like => [like._id.toString(), like.likeCount]));
      comments.forEach(comment => {
          comment.likes = likeMap.get(comment._id.toString()) || 0;
      });

      // Flatten the userId object
      const formattedComments = comments.map(comment => ({
          ...comment,
          username: comment.userId?.username || "Unknown", // Extract username
          avatar: comment.userId?.avatar || null, // Extract avatar
      }));

      // Remove userId field since we don’t need it anymore
      formattedComments.forEach(comment => delete comment.userId);

      res.status(200).json(formattedComments);
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

//for saving projects
export const saveProject = async (req, res) => {
  try {
    const userId = req.user?.userId; // From auth middleware
    const { projectId } = req.params;
    
    // Prevent duplicate save
    const alreadySaved = await Save.findOne({ userId, projectId });
    if (alreadySaved) {
      return res.status(400).json({ success: false, message: "Project already saved" });
    }

    // Save the project
    const newSave = new Save({ userId, projectId });
    await newSave.save();

    res.status(201).json({ success: true, message: "Project saved successfully" });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ success: false, message: "Failed to save project" });
  }
};
export const unsaveProject = async (req, res) => {
  try {
    const userId = req.user?.userId; // From auth middleware
    const { projectId } = req.params;

    const deleted = await Save.findOneAndDelete({ userId, projectId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Save not found" });
    }

    res.status(200).json({ success: true, message: "Project unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving project:", error);
    res.status(500).json({ success: false, message: "Failed to unsave project" });
  }
};




//⚠️ not working or tested

export const updateProject = async (req, res) => {
  try {
      const updatedProject = await Project.findByIdAndUpdate(
          req.params.projectId,
          req.body,
          { new: true }
      );
      if (!updatedProject) return res.status(404).json({ error: "Project not found" });
      res.status(200).json(updatedProject);
  } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
  }
};
export const deleteProject = async (req, res) => {
  try {
      const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
      if (!deletedProject) return res.status(404).json({ error: "Project not found" });
      res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
  }
};



