import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import Comment from "../models/CommentModel.js";
import CommentLike from "../models/CommentLikeModel.js";

const router = express.Router();

//POST   -->api/comment/:commentId/like
router.post("/:commentId/like", verifyToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id; // Assuming user is authenticated

        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required." });
        }

        // Check if the user already liked the comment
        const existingLike = await CommentLike.findOne({ commentId, userId });

        if (existingLike) {
            return res.status(400).json({ message: "You already liked this comment." });
        }

        // Add like
        await CommentLike.create({ commentId, userId });

        res.status(200).json({ message: "Comment liked successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
}});

router.delete("/:commentId/like",verifyToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id; // Assuming user is authenticated

        if (!commentId) {
            return res.status(400).json({ message: "Comment ID is required." });
        }

        // Check if the like exists
        const like = await CommentLike.findOne({ commentId, userId });

        if (!like) {
            return res.status(400).json({ message: "You haven't liked this comment yet." });
        }

        // Remove like
        await CommentLike.deleteOne({ _id: like._id });

        res.status(200).json({ message: "Comment unliked successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.get("/:parentId/replies",verifyToken,async (req, res) => {
    try {
        const { parentId } = req.params;
  
        if (!parentId) {
            return res.status(400).json({ message: "Parent ID is required." });
        }
  
        // Fetch child comments for the given parentId
        const comments = await Comment.find({ parentId })
            .populate("userId", "username avatar") // Fetch only required fields
            .sort({ createdAt: -1 })
            .lean(); // Convert to plain JavaScript objects
  
        // Extract comment IDs for like count aggregation
        const commentIds = comments.map(comment => comment._id);
  
        // Fetch like counts for the comments
        const likes = await CommentLike.aggregate([
            { $match: { commentId: { $in: commentIds } } },
            { $group: { _id: "$commentId", likeCount: { $sum: 1 } } }
        ]);
  
        // Create a like count map for quick lookup
        const likeMap = new Map(likes.map(like => [like._id.toString(), like.likeCount]));
  
        // Transform comments to flatten user info and include likes
        const formattedComments = comments.map(comment => ({
            ...comment,
            username: comment.userId?.username || "Unknown",
            avatar: comment.userId?.avatar || null,
            likes: likeMap.get(comment._id.toString()) || 0,
        }));
  
        res.status(200).json(formattedComments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
  })


export default router;
