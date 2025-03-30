import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();
import User from "../models/UserModel.js";



// Route to check username availability
router.get('/isUserNameAvailable/:username', verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    
    // Check if username is valid format
    
    // const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    // if (!usernameRegex.test(username)) {
    //   return res.status(400).json({ 
    //     available: false, 
    //     message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores' 
    //   });
    // }
    
    // Skip check if user is checking their own username
    if (req.user.username === username) {
      return res.json({ available: true });
    }
    
    // Check if username exists in database
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    return res.json({
      available: !existingUser,
      message: existingUser ? 'Username is already taken' : 'Username is available'
    });
    
  } catch (error) {
    console.error('Username check error:', error);
    return res.status(500).json({ 
      available: false, 
      message: 'An error occurred while checking username availability' 
    });
  }
});

//suggestion for user
router.get("/searchUser",verifyToken, async (req, res) => {
    
  try {
      const { query } = req.query;
      if (!query) return res.status(400).json({ message: "Query is required" });

      const users = await User.find({
          $or: [
              { fullName: { $regex: `\\b${query}`, $options: "i" } }, // Match words starting with query
              { username: { $regex: `^${query}`, $options: "i" } } 
          ]
      })
      .select("username avatar fullName _id")
      .limit(7);  // Limit results to 7 users

      res.json(users);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

// router.get("/suggest/search")


export default router;