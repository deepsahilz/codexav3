import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import Comment from "../models/CommentModel.js";
import CommentLike from "../models/CommentLikeModel.js";

const router = express.Router();

//POST   -->api/comment/:commentId/like
router.post("/:commentId/like", verifyToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId; // Assuming user is authenticated

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
        const userId = req.user.userId; // Assuming user is authenticated

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

router.get("/:parentId/replies", verifyToken, async (req, res) => {
    try {
      const { parentId } = req.params;
      const userId = req.user.id;
  
      if (!parentId) {
        return res.status(400).json({ message: "Parent ID is required." });
      }
  
      const comments = await Comment.find({ parentId })
        .populate("userId", "username avatar")
        .sort({ createdAt: -1 })
        .lean();
  
      const commentIds = comments.map(comment => comment._id);
  
      const likes = await CommentLike.aggregate([
        { $match: { commentId: { $in: commentIds } } },
        { $group: { _id: "$commentId", likeCount: { $sum: 1 } } }
      ]);
  
      const replyCounts = await Comment.aggregate([
        { $match: { parentId: { $in: commentIds } } },
        { $group: { _id: "$parentId", replyCount: { $sum: 1 } } }
      ]);
  
      const userLikes = await CommentLike.find({
        commentId: { $in: commentIds },
        userId: userId
      }).lean();
  
      const likeMap = new Map(likes.map(like => [like._id.toString(), like.likeCount]));
      const replyMap = new Map(replyCounts.map(reply => [reply._id.toString(), reply.replyCount]));
      const userLikedSet = new Set(userLikes.map(like => like.commentId.toString()));
  
      const formattedComments = comments.map(comment => ({
        ...comment,
        username: comment.userId?.username || "Unknown",
        avatar: comment.userId?.avatar || null,
        likes: likeMap.get(comment._id.toString()) || 0,
        replyCount: replyMap.get(comment._id.toString()) || 0,
        isLiked: userLikedSet.has(comment._id.toString()),
      }));
  
      res.status(200).json(formattedComments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  



export default router;
