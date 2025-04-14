import User from "../models/UserModel.js";
import Follow from "../models/followModel.js";
import Project from "../models/ProjectModel.js";
import UserSkill from "../models/UserSkillModel.js";
import { handleProfilePicUpload, deleteFile } from '../middlewares/ProfilePicUpload.js';
import Tag from "../models/TagModel.js";
import Like from "../models/LikeModel.js";
import ProjectTag from "../models/ProjectTagModel.js";
import Comment from "../models/CommentModel.js";
import Save from "../models/SavedProjectModel.js";
import Notification from "../models/NotificationModel.js"; 
import { getIO, getOnlineUsers } from "../../socket.js"; 



export const getUserProfile = async (req, res) => { 
    try {
        const currentUserId = req.user.userId;
        const { username } = req.params;

        const user = await User.findOne({ username }).select("-password");
        if (!user) {return res.status(404).json({ message: "User not found" });}
        const userId = user._id.toString();
        const isOwnProfile = (currentUserId === userId);
        
        //appending counts
        const followerCount = await Follow.countDocuments({ followingId: userId });
        const followingCount = await Follow.countDocuments({ followerId: userId });
        const projectCount = await Project.countDocuments({ AuthorId: userId });
        const userSkills = await UserSkill.find({ userId })
        .populate("skillId", "name")  // Populate the skill name
        .then((skills) => skills.map((skill) => skill.skillId.name));

        const isFollowing = !isOwnProfile && !!(await Follow.exists({ followerId: currentUserId, followingId: userId }));
        const userProfile = {
            ...user.toObject(),
            isOwnProfile,
            isFollowing,
            userSkills,
            followerCount,
            followingCount,
            projectCount
        };
        res.status(200).json(userProfile);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};        

export const getUserProjects = async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = user._id;

    const projects = await Project.find({ AuthorId: userId, isHidden: false })
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar")
      .sort({ createdAt: -1 });

    const projectIds = projects.map((project) => project._id);

    const [projectTags, likeCounts, userLikes, commentCounts, saveCounts, userSaves] = await Promise.all([
      ProjectTag.find({ projectId: { $in: projectIds } }).populate("tagId", "name"),
      Like.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Like.find({ projectId: { $in: projectIds }, userId }).select("projectId"),
      Comment.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Save.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Save.find({ projectId: { $in: projectIds }, userId }).select("projectId"),
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
    saveCounts.forEach(({ _id, count }) => {
      savedCountMap[_id.toString()] = count;
    });

    const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));
    const userSavedSet = new Set(userSaves.map((save) => save.projectId.toString()));

    const tagsMap = {};
    projectTags.forEach((projectTag) => {
      const projectIdStr = projectTag.projectId.toString();
      if (!tagsMap[projectIdStr]) tagsMap[projectIdStr] = [];

      if (projectTag.tagId?.name) {
        projectTag.tagId.name.split(",").forEach((part) => {
          const trimmed = part.trim();
          if (trimmed) tagsMap[projectIdStr].push(trimmed);
        });
      }
    });

    const projectsWithDetails = projects.map((project) => {
      const projectObj = project.toObject();
      const projectId = project._id.toString();

      return {
        ...projectObj,
        tags: tagsMap[projectId] || [],
        likeCount: likeCountMap[projectId] || 0,
        isLiked: userLikedSet.has(projectId),
        commentCount: commentCountMap[projectId] || 0,
        savedCount: savedCountMap[projectId] || 0,
        isSaved: userSavedSet.has(projectId),
      };
    });

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user projects",
      error: error.message,
    });
  }
};

export const getUserSavedProjects = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const savedProjects = await Save.find({ userId }).select("projectId");
    const projectIds = savedProjects.map((save) => save.projectId);

    const projects = await Project.find({ _id: { $in: projectIds }, isHidden: false })
      .populate("AuthorId", "username avatar isVerified")
      .populate("collaborators.userId", "username avatar")
      .sort({ createdAt: -1 });

    const [projectTags, likeCounts, commentCounts, saveCounts, userLikes] = await Promise.all([
      ProjectTag.find({ projectId: { $in: projectIds } }).populate("tagId", "name"),
      Like.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Comment.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Save.aggregate([
        { $match: { projectId: { $in: projectIds } } },
        { $group: { _id: "$projectId", count: { $sum: 1 } } },
      ]),
      Like.find({ projectId: { $in: projectIds }, userId }).select("projectId"),
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
    saveCounts.forEach(({ _id, count }) => {
      savedCountMap[_id.toString()] = count;
    });

    const userSavedSet = new Set(projectIds.map((id) => id.toString()));
    const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));

    const tagsMap = {};
    projectTags.forEach((projectTag) => {
      const projectIdStr = projectTag.projectId.toString();
      if (!tagsMap[projectIdStr]) tagsMap[projectIdStr] = [];

      if (projectTag.tagId?.name) {
        projectTag.tagId.name.split(",").forEach((part) => {
          const trimmed = part.trim();
          if (trimmed) tagsMap[projectIdStr].push(trimmed);
        });
      }
    });

    const projectsWithDetails = projects.map((project) => {
      const projectObj = project.toObject();
      const projectId = project._id.toString();

      return {
        ...projectObj,
        tags: tagsMap[projectId] || [],
        likeCount: likeCountMap[projectId] || 0,
        isLiked: userLikedSet.has(projectId),
        commentCount: commentCountMap[projectId] || 0,
        savedCount: savedCountMap[projectId] || 0,
        isSaved: userSavedSet.has(projectId),
      };
    });

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    console.error("Error fetching saved projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved projects",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Verify user is updating their own profile
    if (req.user.username !== username) {
      return res.status(403).json({ error: "Unauthorized: Cannot update another user's profile" });
    }

    // Handle file upload if there is a file
    try {
      await handleProfilePicUpload(req, res);
    } catch (uploadError) {
      return res.status(400).json({ error: uploadError });
    }
    const { fullName, bio, new_username, country, visibility, skills } = req.body;

    // Validate required fields
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ error: "Full name is required" });
    }

    // Prepare update object
    const updateData = {
      username: new_username,
      fullName,
      bio: bio || "",
      country: country || "",
      isPrivate: visibility === "private",
    };

    // Include avatar path if file was uploaded
    if (req.file) {
      const currentUser = await User.findOne({ username });
      if (currentUser && currentUser.avatar) {
        deleteFile(currentUser.avatar);
      }
      updateData.avatar = `/${req.file.path.replace(/\\/g, "/")}`;
    }

    // Find user by username and update
    const updatedUser = await User.findOneAndUpdate(
      { username },
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // **Update user skills**
    if (Array.isArray(skills) && skills.length > 0) {
      const userId = updatedUser._id;

      // Delete old skills
      await UserSkill.deleteMany({ userId });

      // Fetch skill IDs from Tag model
      const skillDocs = await Tag.find({ name: { $in: skills } }, "_id");
      const skillEntries = skillDocs.map((skill) => ({
          userId,
          skillId: skill._id,
        }));

      // Insert new skills
      if (skillEntries.length > 0) {
        const updated_skills = await UserSkill.insertMany(skillEntries);
      }
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser.toObject(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    res.status(500).json({ error: "Server error while updating profile" });
  }
};

//SEARCH-HISTORY ✅3
export const getSearchHistory = async (req, res) => {
  try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ searchHistory: (user.searchHistory || []).reverse() });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch search history" });
  }
} 
export const addSearchHistory = async (req, res) => {
  try {
      const userId = req.user.userId;
      const { searchTerm } = req.body;

      if (!searchTerm) {
          return res.status(400).json({ success: false, message: "Search term is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // Remove duplicate if it exists and add the new term at the end
      user.searchHistory = user.searchHistory.filter(term => term !== searchTerm);
      user.searchHistory.push(searchTerm);

      // Keep only the last 10 searches
      if (user.searchHistory.length > 10) {
          user.searchHistory.shift(); // Remove the oldest search
      }

      await user.save();
      return res.json({ success: true, searchHistory: user.searchHistory });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating search history" });
  }
};
export const removeSearchHistoryItem = async (req, res) => {
  try {
      const userId = req.user.userId;
      const { searchTerm } = req.body;

      if (!searchTerm) {
          return res.status(400).json({ success: false, message: "Search term is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // Remove the specific search term
      user.searchHistory = user.searchHistory.filter(term => term !== searchTerm);

      await user.save();
      return res.json({ success: true, searchHistory: user.searchHistory });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error removing search history item" });
  }
};

//FOLLOW RELATED ✅4
export const getFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    

    const user = await User.findOne({ username }).select("_id");
    if (!user) return res.status(404).json({ error: "User not found" });

    const followers = await Follow.find({ followingId: user._id })
      .populate("followerId", "fullName username avatar");

    res.status(200).json({ followers: followers.map(f => f.followerId) });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
export const followUser = async (req, res) => {
    try {
        const { userId } = req.params;  // User B
        const currentUserId = req.user.userId;  // From JWT token (User A)
        // Prevent following yourself
        if (userId === currentUserId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        // Check if already following
        const existingFollow = await Follow.findOne({ followerId: currentUserId, followingId: userId });
        if (existingFollow) {
            return res.status(400).json({ error: "Already following this user" });
        }
        // Create new follow entry
        const newFollow = new Follow({ followerId: currentUserId, followingId: userId });
        await newFollow.save();
        
        // Check for an existing follow notification
        const existingNotification = await Notification.findOne({
          senderId: currentUserId,
          recieverId: userId,
          type: "follow",
        }).sort({ createdAt: -1 });

        if (existingNotification) {
            const timeDifference = new Date() - existingNotification.createdAt;
            if (timeDifference < 60000) { // If less than 1 minute (60000 ms)
                return res.status(200).json({ message: "Follow action too quick. No notification sent." });
            }
        }
        // Create a new follow notification for User B if it's been more than a minute
        const notification = new Notification({
            recieverId: userId,
            senderId: currentUserId,
            type: "follow",
            message: `${currentUserId} followed you`,
        });
        await notification.save();

        // Emit a real-time notification if User B is online
        const onlineUsers = getOnlineUsers();
        if (onlineUsers.has(userId)) {
            const userSocketId = onlineUsers.get(userId);
            const io = getIO();
            console.log("emitting follow notification to",userSocketId);
            io.to(userSocketId).emit("new-notification", {
                message: `${currentUserId} followed you`,
                type: "follow",
            });
        }

        // Return success response
        res.status(200).json({ message: "Followed successfully" });
    } catch (error) {
      console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};
export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.userId; // From JWT token

        // Find and delete the follow entry
        const deletedFollow = await Follow.findOneAndDelete({ followerId: currentUserId, followingId: userId });
        if (!deletedFollow) {
            return res.status(400).json({ error: "You are not following this user" });
        }

        res.status(200).json({ message: "Unfollowed successfully" });

      } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//NOTIFICATIONS ✅1
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notifications = await Notification.find({ recieverId: userId })
      .populate("senderId", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.updateMany(
      { recieverId: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};




export const deleteUser = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};
export const getFollowing = async (req, res) => {
  try {
      const { userId } = req.params;

      const following = await Follow.find({ followerId: userId }).populate("followingId", "fullName username avatar");

      res.status(200).json({ following: following.map(f => f.followingId) });
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};