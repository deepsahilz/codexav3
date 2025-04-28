import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    followingId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPending: { type: Boolean, default: false }, // For private accounts
  },
  { timestamps: true }
);

// Check if the model already exists to prevent overwriting it
const Follow = mongoose.models.Follow || mongoose.model("Follow", followSchema);

export default Follow;
