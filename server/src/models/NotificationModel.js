import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recieverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Triggered by
    type: { type: String, enum: ["like", "comment", "follow","message"], required: true },
    message: { type: String, required: true },
    projectThumbnail: { type: String, default: "" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);

