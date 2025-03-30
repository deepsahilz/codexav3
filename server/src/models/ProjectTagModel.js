import mongoose from "mongoose";

const projectTagSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    tagId: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  // { timestamps: true }
);

export default mongoose.model("ProjectTag", projectTagSchema);
