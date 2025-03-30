import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; 


export const signup = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({message: "Email or username already taken"});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(409).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Email or password is incorrect" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Store token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side JS access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Protects against CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiry
        });

        const userData = {
            userId: user._id,
            username: user.username,
            avatar: user.avatar,
        };

        res.cookie("user", JSON.stringify(userData), {
            httpOnly: false, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Set to true in production (HTTPS)
        sameSite: "None", // Required for cross-site cookies
    });
    res.status(200).json({ message: "Logout successful" });
};

export const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await User.findById(req.user.userId).select("username avatar"); // Fetch user details
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ id: user._id, username: user.username, avatar: user.avatar });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

