import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Recipient
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Triggered by
    type: { type: String, enum: ["like", "comment", "follow"], required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null }, // If related to a project
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
