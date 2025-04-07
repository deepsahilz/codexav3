import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

// Ensure a user can save a project only once
saveSchema.index({ userId: 1, projectId: 1 }, { unique: true });

export default mongoose.model("Save", saveSchema);
