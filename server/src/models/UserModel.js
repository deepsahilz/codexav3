import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        bio: { type: String, default: "" },
        role:{ type: String, enum: ["admin", "user"], default: "user"},
        country: { type: String, default: "" },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        avatar: { type: String, default: "" },
        password: { type: String, required: true },
        // skills: { type: [String], default: [] },
        isPrivate: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        accountStatus: { type: String, enum: ["banned", "active"], default: "active" },
        themePreference: { type: String, enum: ["dark", "light"], default: "light" },
        searchHistory: {
            type: [String],
            default: [],
            validate: {
                validator: function (arr) {
                    return arr.length <= 10; // Ensures max 10 searches
                },
                message: "Search history cannot exceed 10 items.",
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
