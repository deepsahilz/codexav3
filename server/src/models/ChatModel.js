import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, default: false },
    groupName: { type: String, default: null },
    groupImage: { type: String, default: null },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, 
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      validate: function (members) {
          return this.isGroup || members.length === 2; // Direct chat must have exactly 2 members
      },
  },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
