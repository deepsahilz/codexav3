import User from "../models/UserModel.js";
import { getOnlineUsers } from "../../socket.js";
import Project from "../models/ProjectModel.js";


export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password -__v"); // exclude password and __v
        // console.log(users)
        res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error while fetching users" });
    }
};

export const banUser = async (req, res) => {
    try {
        console.log("hello folks");
        const { userId } = req.params;
        await User.findByIdAndUpdate(userId, { accountStatus: "banned" });
        res.status(200).json({ message: "User banned successfully" });
    } catch (error) {
        console.error("Ban error:", error);
        res.status(500).json({ error: "Server error while banning user" });
    }
};

export const unbanUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndUpdate(userId, { accountStatus: "active" });
        res.status(200).json({ message: "User unbanned successfully" });
    } catch (error) {
        console.error("Unban error:", error);
        res.status(500).json({ error: "Server error while unbanning user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server error while deleting user" });
    }
};

export const fetchStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const bannedUsers = await User.countDocuments({ accountStatus: "banned" });
    const onlineUsers = getOnlineUsers().size;

    res.status(200).json({
      totalUsers,
      bannedUsers,
      onlineUsers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Server error while fetching stats" });
  }
};

export const fetchProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate("AuthorId", "username"); // Populate AuthorId with username
        // console.log(projects); // Debugging line
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Server error while fetching projects" });
    }
}