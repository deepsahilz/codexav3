import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import TagsInput from "./TagsInput.jsx";
import { useUserContext } from "../context/UserContextProvider.jsx";
import edit_pencil from "../assets/images/edit_pencil.svg";

const EditProfile = () => {
    const { username } = useParams();
    const { user,setUser } = useUserContext();
    const navigate = useNavigate();
    
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({mode: "onChange",});
    const [userData, setUserData] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [skills, setSkills] = useState([]);
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [usernameStatus, setUsernameStatus] = useState("initial");
    const [originalUsername, setOriginalUsername] = useState("");
    

    const watchUsername = watch("username");

    // Fetch user data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get(`/api/user/${username}`);
                setUserData(response.data);
                setOriginalUsername(response.data.username);
                setSkills(response.data.userSkills);
                // console.log(skills);
                if (response.data.visibility) {
                    setProfileVisibility(response.data.visibility);
                
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData();
    }, [username]);

    // Check username availability with debounce
    useEffect(() => {
        // Skip validation if username hasn't changed or there's a pattern error
        if (!watchUsername || watchUsername === originalUsername || errors.username) {
            setUsernameStatus("initial");
            return;
        }

        // Debounce implementation
        setUsernameStatus("checking");
        const timeoutId = setTimeout(async () => {
            try {
                const response = await axiosInstance.get(`/api/utils/isUserNameAvailable/${watchUsername}`);
                setUsernameStatus(response.data.available ? "available" : "unavailable");
            } catch (error) {
                console.error("Error checking username:", error);
                setUsernameStatus("error");
            }
        }, 500);


        return () => clearTimeout(timeoutId);
    }, [watchUsername, originalUsername, errors.username]);

    //handling profile_image change & preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(null);
        }
    };

    const onSubmit = async (data) => {
        if (usernameStatus === "unavailable" || usernameStatus === "checking") {
            return;
        }

        const formData = new FormData();
        formData.append("new_username", data.username);
        formData.append("fullName", data.fullName);
        formData.append("bio", data.bio);
        formData.append("country", data.country);
        formData.append("visibility", profileVisibility);
        skills.forEach((skill, index) => {
            formData.append(`skills[${index}]`, skill);
          });
        console.log(skills);
        if (file) formData.append("file", file);

        try {
            // const formDataObject = {};
            // formData.forEach((value, key) => {
            // formDataObject[key] = value;
            // });
            // console.log(formDataObject);

            const response = await axiosInstance.post(`/api/user/${user.username}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data' 
                  },
                showToast:true,
                toastMessage:"Profile updated successfully"
            } );
            navigate(`/user/${data.username}`);
          
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!userData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-200 p-4 w-full flex flex-col items-center justify-center font-neue">
            <div className="bg-zinc-50 shadow-lg w-[55rem] rounded-lg mb-[20rem]">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-nb border-b px-10 py-3">Edit Profile</h2>
                <div className="px-10 flex flex-col justify-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">

                        {/* Profile Image */}
                        <div className=" flex flex-col items-center md:items-start relative">
                            <label className="block font-semibold text-zinc-700 mb-2">Profile Image</label>
                            <div className="w-[10rem] h-[10rem] rounded-full border relative">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                
                                {preview ? (    
                                <img src={preview} alt="Preview" className="w-full h-full  rounded-full object-cover" />
                                ) : (<Avatar width="100%" height="100%" username={userData.username} avatar_url={userData.avatar} />)}

                                </div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('file-upload').click()}
                                    className="absolute w-9 h-9 top-2 right-2 bg-white p-2 rounded-full border border-zinc-400 hover:bg-gray-200"
                                >
                                    <img className="w-full h-full object-cover" src={edit_pencil} alt="Edit" />
                                </button>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {/* Username with availability checker */}
                        <div className="">
                            <label className="block font-semibold text-zinc-700">Username</label>

                            <div className="relative">
                                <input type="text"
                                    placeholder="Enter your username"
                                    defaultValue={userData.username}
                                    {...register("username", {
                                        required: "Username is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]{3,20}$/,
                                            message: "Username must be 3-20 characters and contain only letters, numbers, and underscores",
                                        },
                                    })}
                                    className={`mt-1 w-full px-3 h-10 py-1 border rounded-lg focus:outline-none focus:ring-2 ${
                                        usernameStatus === "available" ? "focus:ring-green-300 border-green-300" :
                                        usernameStatus === "unavailable" ? "focus:ring-red-300 border-red-300" :
                                        "focus:ring-blue-300"
                                    }`}/>
                                {errors.username && (<p className="text-red-500 text-sm mt-1">{errors.username.message}</p>)}
                                {usernameStatus === "checking" && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 h-2">
                                {usernameStatus === "available" && !errors.username && (
                                    <div className="flex items-center text-green-500">
                                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm">Username available</span>
                                    </div>
                                )}
                                {usernameStatus === "unavailable" && (
                                    <div className="flex items-center text-red-500">
                                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-sm">Username already taken</span>
                                    </div>
                                )}
                                {usernameStatus === "error" && (
                                    <div className="flex items-center text-yellow-500">
                                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span className="text-sm">Could not check availability</span>
                                    </div>
                                )}
                            </div>

                            
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block font-semibold text-zinc-700 ">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                defaultValue={userData.fullName}
                                {...register("fullName",{
                                    required:{
                                        value:true,
                                        message:"Full Name is required"
                                    }
                                })}
                                className="mt-1 w-full px-3 h-10 py-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            {errors.fullName && (<p className="text-red-500 text-sm mt-2">{errors.fullName?.message}</p>)}

                        </div>

                        {/* Bio */}
                        <div className="col-span-2">
                            <label className="block font-semibold text-zinc-700">Bio</label>
                            <textarea
                                placeholder="Tell us about yourself"
                                defaultValue={userData.bio}
                                {...register("bio")}
                                className="mt-1 w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block font-semibold text-zinc-700">Country</label>
                            <input
                                type="text"
                                placeholder='e.g, "India" '
                                defaultValue={userData.country}
                                {...register("country")}
                                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Tags Input - Make sure to pass control */}
                        <TagsInput label = "Skills" placeholder="e.g., React, Node.js, UI/UX" subLabel="Add tags related to your kills" tags={skills} setTags={setSkills} control={control}/>

                        {/* Profile Visibility */}
                        <div className="col-span-2">
                            <label className="block font-semibold text-zinc-700 mb-2">Profile Visibility</label>
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-600">Private</span>
                                <div 
                                    className={`relative inline-block w-12 h-6 transition-all duration-300 ease-in-out rounded-full cursor-pointer ${
                                        profileVisibility === "private" ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                    onClick={() => setProfileVisibility(profileVisibility === "public" ? "private" : "public")}
                                >
                                    <span 
                                        className={`absolute top-1 left-1 inline-block w-4 h-4 transition-all duration-300 ease-in-out transform bg-white rounded-full shadow ${
                                            profileVisibility === "private" ? "translate-x-6" : ""
                                        }`}
                                    />
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                {profileVisibility === "public" 
                                    ? "Your profile is visible to everyone" 
                                    : "Your profile is only visible to you"}
                            </p>
                        </div>

                        {/* Cancel Button */}
                        <div>
                            <button type="button"
                                onClick={() => navigate(`/user/${username}`)}
                                className="w-full bg-zinc-300 text-zinc-700 py-2 px-4 rounded-lg hover:bg-zinc-400 hover:text-white transition duration-200">
                                Cancel
                            </button>
                        </div>
                                                
                        {/* Submit Button */}
                        <div>
                            <button 
                                type="submit"
                                disabled={usernameStatus === "unavailable" || usernameStatus === "checking"}
                                className={`w-full py-2 px-4 rounded-lg transition duration-200 bg-blue-500 hover:shadow-xl shadow-blue-600 text-white hover:bg-blue-600`}
                                // ${usernameStatus === "unavailable" || usernameStatus === "checking" || Object.keys(errors).length > 0
                                //         ? "bg-gray-400 cursor-not-allowed"
                                //         : "bg-blue-500 hover:shadow-xl shadow-blue-600 text-white hover:bg-blue-600"
                                // }
                                
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;