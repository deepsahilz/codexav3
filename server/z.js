import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import path from 'path';
import { createUser, getUserById,getUserByEmail, getUsernameByEmail, getAllUserdata, getUserByUsername, followUser, getUserIdByEmail, getUserIdByUsername, getfollowdata, unfollowUser, userIsFollowing, getFollowers, getUserPreviewData, getFollowing, addProject, getUserProjects, getProjectCount, updateUserData,  } from './db.js';
import multer from 'multer';
import cors from 'cors';
const app = express();
dotenv.config();


app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true, // Enable credentials (cookies)
  }));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, 'uploads'); }, // Specify upload folder
       filename: (req, file, cb) => {cb(null, Date.now() + path.extname(file.originalname));}, // Unique file name
  });
const upload = multer({ storage });



app.get("/",(req,res)=>{
    res.send("server working")
})
app.post("/api/signup", async (req, res) => {
    console.log("\n---Signup request initiated---");
    const { email, password, ...rest } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user) {
            console.log({ signupSucceed: false, message: "User already exists" });
            return res.status(409).send({signupSucceed: false, message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUserId = await createUser({ email, password: hashedPassword, ...rest });
        const newUser = await getUserById(newUserId);

        console.log("\nNEW USER CREATED-> \n", newUser);
        console.log({ signupSucceed: true, message:"Account created successfully" });
        
        return res.status(201).send({ signupSucceed: true, message: "Account created successfully" });
    } 
    catch (err) {
        console.error("Error during signup process: ", err.stack);
        return res.status(500).send({ signupSucceed: false, message: "Internally server error" });
    }
});
app.post("/api/login",async(req,res)=>{
    const {email,password} = req.body;
    console.log(`\n-> Login request for email:\n-- ${email}`)
    
    const user = await getUserByEmail(email) 
    if(user){
        bcrypt.compare(password,user.password_hash,(err,result)=>{
            if(result === true){
                //SENDING TOKEN TO CLIENT-SIDE
                //JWT CREATED FROM EMAIL AND SECURITY_KEY
                const token = Jwt.sign(email,"secure");
                console.log("--> Access token granted:",token)
                res.cookie("token",token);
                res.send({isLoginSucceed:true,message:"Login successfull"})
                console.log({loginSucceed:true})
            }else{
                console.log({isLoginSucceed:false,message:"incorrect password"})
                res.send({isLoginSucceed:false,message:"incorrect password"})
            }
        })
    }else{
        console.log({isLoginSucceed:false,message:"no user found"});
        res.send({isLoginSucceed:false,message:"no user found"})
    }
})
app.post("/api/search",(req,res)=>{
    const searchquery = req.body.search;
    console.log(searchquery);
    res.send("you mean "+ searchquery)
})


app.get("/api/navdata",async(req,res)=>{
    console.log("\n@ Get request at (/api/navdata)")
    const token = req.cookies.token; 
    if(!token){
        return res.send("bad request")
    }
    const email = Jwt.verify(token,"secure");
    const {profile_image,username} = await getUserByEmail(email);
    console.log("\n--> Username and Image fetched successfully:",username
    ,profile_image);
    res.send({username,profile_image});
})
app.post("/api/verifytoken",(req,res)=>{
    const token = req.cookies.token; 
    res.send({"istokenvalid":true});
})


// user routes
app.post('/api/editprofile', upload.single('file'), async (req, res) => {
    const newData = Object.assign({},req.body);
    const file = req.file; // Uploaded profile image
    const token = req.cookies.token; 
    const email = Jwt.verify(token,"secure")
    const userId = await getUserIdByEmail(email);
    console.log(userId)
    console.log(newData);
    
    try {
        // Prepare the update query and values
        const updates = {};
        if (newData.username) updates.username = newData.username;
        if (newData.firstname) updates.firstname = newData.firstname;
        if (newData.lastname) updates.lastname = newData.lastname;
        if (newData.bio) updates.bio = newData.bio;
        if (newData.country) updates.country = newData.country;
        // Handle profile image update if new image is provided
        if (file) {
            // Delete the old profile image if it exists
            // if (user.profile_image) {
            // fs.unlinkSync(`uploads/${user.profile_image}`);
            // }
            // Save the new image filename
            updates.profile_image = file.filename;
        }
    
    
        // Update the user profile in the database
        const setValues = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(updates);
        console.log(setValues);
        console.log(updateValues);
        const result = await updateUserData(setValues, updateValues,userId);
        console.log(result)
        res.status(200).json({ message: 'Profile updated successfully', result });
        // res.send("ok");
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get( "/api/user/:userName",async(req,res)=>{
    console.log("\n@ Get request at (/api/user/{:username})")
    const { userName } = req.params;
    const token = req.cookies.token; 
    let userSelf = false;
    if(!token){
        return res.send("bad request")
    }

    const email = Jwt.verify(token,"secure");
    const currentusername = await getUsernameByEmail(email);
    const currentUserId = await getUserIdByEmail(email);
    const userid2= await getUserIdByUsername(userName);
    if(currentusername == userName){userSelf = true;}     

    try{
        const userData = await getUserByUsername(userName);
        const followdata = await getfollowdata(userid2);
        const isfollowing = await userIsFollowing(currentUserId,userid2);
        const projectCount = await getProjectCount(userid2);

        userData.self = userSelf;
        userData.followers = followdata.followers;
        userData.following = followdata.following;
        userData.isfollowing = isfollowing;
        userData.projectCount = projectCount;
        
        
        console.log("\n--> UserData fetched successfully:",userData);
        res.send(userData);

    }catch(error){
        console.log("\n-->Error while fetching user data at (/api/user/{:username})",error);
        res.send({message:"error while fetching user data at server",exist:false});
    }
})
app.post("/api/user/:userName/follow",async(req,res)=>{
    console.log("\n@ POST request at (/api/user/{:username}/follow)")
    const token = req.cookies.token; 
    if(!token){
        return res.send("bad request")
    }

    const { userName } = req.params;
    const email = Jwt.verify(token,"secure");

    try{
        const currentUserId = await getUserIdByEmail(email);
        const followUserId = await getUserIdByUsername(userName);
        const yoyo = await followUser(currentUserId,followUserId);
        res.send({followStatus:1});
    }catch(error){
        console.log("\n-->Error happened",error);
        res.send({followStatus:0, message:"error while fetching user data at server"});
    }
})
app.post("/api/user/:userName/unfollow",async(req,res)=>{
    console.log("\n@ POST request at (/api/user/{:username}/unfollow)")
    const token = req.cookies.token; 
    if(!token){
        return res.send("bad request")
    }

    const { userName } = req.params;
    const email = Jwt.verify(token,"secure");

    try{
        const currentUserId = await getUserIdByEmail(email);
        const followUserId = await getUserIdByUsername(userName);
        const yoyo = await unfollowUser(currentUserId,followUserId)
        res.send({followStatus:0});
    }catch(error){
        console.log("\n-->Error happened",error);
        res.send({followStatus:1,message:"error while fetching user data at server"});
    }
})
app.get( "/api/user/:userName/followers",async(req,res)=>{
    console.log("\n@ POST request at (/api/user/{:username}/followers)")
    // const token = req.cookies.token; 
    // if(!token){
    //     return res.send("bad request")
    // }

    // const email = Jwt.verify(token,"secure");
    const { userName } = req.params;

    try{
        const userId = await getUserIdByUsername(userName);
        const followers = await getFollowers(userId);
        const followersData = await getUserPreviewData(followers);
        res.send(followersData);

    }catch(error){
        console.log("\n-->Error happened",error);
        res.send({message:"error"});
    }
})
app.get( "/api/user/:userName/following",async(req,res)=>{
    console.log("\n@ POST request at (/api/user/{:username}/following)")
    // const token = req.cookies.token; 
    // if(!token){
    //     return res.send("bad request")
    // }

    // const email = Jwt.verify(token,"secure");
    const { userName } = req.params;

    try{
        const userId = await getUserIdByUsername(userName);
        const following = await getFollowing(userId);
        const followingData = await getUserPreviewData(following);
        res.send(followingData);

    }catch(error){
        console.log("\n-->Error happened",error);
        res.send({message:"error"});
    }
})
app.get("/api/:username/projects",async(req,res)=>{
    const {username} = req.params;
    const userid = await getUserIdByUsername(username);
    const result = await getUserProjects(userid);
    res.send(result);
}) 


//project routes
app.get("/api/exploreProjects",async(req,res)=>{
    console.log("\n@ Get request at (/api/feedData)");
    const token = req.cookies.token; 
    if(!token){
        return res.send("bad request")
    }
    const email = Jwt.verify(token,"secure");
    const result = await  getAllUserdata();
    console.log("\n-->FeedData fetched successfully.")
    res.send(result);
})
app.post("/api/addproject",  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "mediaFiles", maxCount: 10 },
  ]), async(req, res) => {

    console.log("request recieved guys ");
    
    try {
    const token = req.cookies.token; 
    const email = Jwt.verify(token,"secure")
    const userId = await getUserIdByEmail(email);
      
    const { title, description, liveLink, codeLink, projectStatus } = req.body;
    const mediaFiles = req.files.mediaFiles.map((file) => (file.filename));
    const thumbnail = req.files.thumbnail[0].filename;        
    const newProject = { userId, title, description, liveLink, codeLink, projectStatus, mediaFiles,thumbnail };

    console.log(newProject);
    const result = await addProject(newProject);
    res.status(201).json({success: true, insertId:result, message: "Project added successfully",});
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error oye" });
    }
});
app.post("/api/project/:projectId/like", async (req, res) => {
    console.log("\n@ POST request at (/api/project/{:projectId}/like)");
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(400).send("Bad request: Missing token");
    }

    const { projectId } = req.params; // Get project ID from URL
    const email = Jwt.verify(token, "secure"); // Decode email from token

    try {
        // Fetch user and project IDs
        const currentUserId = await getUserIdByEmail(email);
        const likeStatus = await likeProject(currentUserId, projectId);

        res.send({ likeStatus: 1, message: "Project liked successfully" });
    } catch (error) {
        console.log("\n--> Error happened", error);
        res.send({
            likeStatus: 0,
            message: "Error while processing like request",
        });
    }
});



const port = process.env.PORT
app.listen(port,()=>{
    console.log(`app running on http://localhost:${port}`)
})

// export const getAllProjects = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     const projects = await Project.find({ isHidden: false })
//       .populate("AuthorId", "username avatar isVerified")
//       .populate("collaborators.userId", "username avatar")
//       .sort({ createdAt: -1 });

//     const projectIds = projects.map((project) => project._id);

//     const [projectTags, likeCounts, userLikes, commentCounts] = await Promise.all([
//       ProjectTag.find({ projectId: { $in: projectIds } }).populate("tagId", "name"),
//       Like.aggregate([
//         { $match: { projectId: { $in: projectIds } } },
//         { $group: { _id: "$projectId", count: { $sum: 1 } } },
//       ]),
//       userId
//         ? Like.find({ projectId: { $in: projectIds }, userId }).select("projectId")
//         : [],
//       Comment.aggregate([
//         { $match: { projectId: { $in: projectIds } } },
//         { $group: { _id: "$projectId", count: { $sum: 1 } } },
//       ]),
//     ]);

//     const likeCountMap = {};
//     likeCounts.forEach(({ _id, count }) => {
//       likeCountMap[_id.toString()] = count;
//     });

//     const commentCountMap = {};
//     commentCounts.forEach(({ _id, count }) => {
//       commentCountMap[_id.toString()] = count;
//     });

//     const userLikedSet = new Set(userLikes.map((like) => like.projectId.toString()));

//     const tagsMap = {};
//     projectTags.forEach((projectTag) => {
//       const projectIdStr = projectTag.projectId.toString();
//       if (!tagsMap[projectIdStr]) tagsMap[projectIdStr] = [];

//       if (projectTag.tagId?.name) {
//         projectTag.tagId.name.split(",").forEach((part) => {
//           const trimmed = part.trim();
//           if (trimmed) tagsMap[projectIdStr].push(trimmed);
//         });
//       }
//     });

//     const projectsWithDetails = projects.map((project) => {
//       const projectObj = project.toObject();
//       const projectId = project._id.toString();

//       return {
//         ...projectObj,
//         tags: tagsMap[projectId] || [],
//         likeCount: likeCountMap[projectId] || 0,
//         isLiked: userLikedSet.has(projectId),
//         commentCount: commentCountMap[projectId] || 0,
//       };
//     });

//     res.status(200).json(projectsWithDetails);
//   } catch (error) {
//     console.error("Error fetching home feed projects:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch projects",
//       error: error.message,
//     });
//   }
// };
