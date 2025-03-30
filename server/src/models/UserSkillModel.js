import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  // { timestamps: true }
);

export default mongoose.model("UserSkill", userSkillSchema);
