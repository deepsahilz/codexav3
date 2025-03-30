import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isAdmin: { type: Boolean, default: false }, // Only relevant for group chats
  },
  { timestamps: true }
);

export default mongoose.model("GroupMember", groupMemberSchema);
