import Chat from "../models/ChatModel.js";

export const createChat = async (req, res) => {
  try {
    const { members, isGroup, groupName, groupAvatar } = req.body;

    if (!Array.isArray(members) || members.length < 2) {
      return res.status(400).json({ error: "At least two users required." });
    }

    // Each user: { user: ObjectId, role: "admin" | "member" }
    const newChat = new Chat({
      members: members,
      isGroup,
      groupName: isGroup ? groupName : null,
      groupAvatar: isGroup ? groupAvatar : null,
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserChats = async (req, res) => {
  try {
    
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Server error" });
  }
};
