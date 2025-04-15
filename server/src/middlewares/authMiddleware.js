import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"; // Adjust the path as needed

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
            }

            try {
                // Fetch user from database to get the username
                const user = await User.findById(decoded.userId);
                
                if (!user) {
                    return res.status(404).json({ error: "middleware: User not found" });
                }

                // Add username to the decoded info
                req.user = {
                    ...decoded,
                    username: user.username
                };
                
                next();
            } catch (dbError) {
                console.error("Database error in token verification:", dbError);
                return res.status(500).json({ error: "Error retrieving user data" });
            }
        });
    } catch (error) {
        console.error("Server error during token verification:", error);
        res.status(500).json({ error: "Server error during token verification" });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        //check if request user.role === admin, then next, otherwise res error

    } catch (error) {
        console.error("Server error during admin verfication:", error);
        res.status(500).json({ error: "Server error during admin verification" });
    }
};


export default verifyToken;