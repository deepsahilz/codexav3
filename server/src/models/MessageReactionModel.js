import mongoose from "mongoose";

const messageReactionSchema = new mongoose.Schema(
  {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    emoji: { type: String, required: true }, // e.g., "🔥", "❤️"
  },
  { timestamps: true }
);

export default mongoose.model("MessageReaction", messageReactionSchema);
