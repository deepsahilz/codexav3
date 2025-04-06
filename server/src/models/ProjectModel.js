import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    AuthorId:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true  },
    description: { type: String },
    thumbnail: { type: String }, // URL for project image
    codeLink: { type: String }, // GitHub/Repo link
    liveLink: { type: String }, // Deployment link
    isInProgress: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
    collaborators:[
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status:{ type: String, enum: ["accepted", "pending", "declined"], default: "pending"}
      }
    ],
    mediaFiles: [{ type: String }],
    
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
// mediaFiles: [
    //   {
    //     url: { type: String, required: true },
    //     type: { type: String, enum: ["image", "video", "audio", "document"] },
    //     format: { type: String },
    //     size: { type: Number }, // File size in bytes
    //     duration: { type: Number }, // Only for audio/video
    //   }
    // ],