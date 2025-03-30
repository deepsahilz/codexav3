import mongoose from "mongoose";

const commentLikeSchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("CommentLike", commentLikeSchema);
