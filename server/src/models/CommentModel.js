import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    content: { type: String, required: true,default:null },
    gifUrl: { type: String, default:null }, // If user includes a GIF
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
