import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likeSchema);
