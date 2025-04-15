import React, { useContext, useEffect, useState } from 'react'
import location_icon from "../assets/images/location_icon.svg";
import bell_icon from "../assets/images/bellIcon.svg";
import bell_off from "../assets/images/bell-off.svg";
import axios from 'axios';
import { Link, NavLink, redirect, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContextProvider.jsx';
import ProfileFooter from './ProfileFooter';
import axiosInstance from '../utils/axiosInstance.js';
import ProjectGrid from './ProjectGrid';
import Avatar from './Avatar';
import bannerImg from "../assets/images/ux-banner.webp"
import OpenProjectSkeleton from './OpenProjectSkeleton.jsx';

const ProfilePage = () => {
    const dummyuser = {
        fullName: "karan singh",
        bio: "Hi everyone, i hope you are doing good. I would love to collaborate, just DM me in the messages.",
        country: "egland",
        email: "deep@gmail.com",
        username: "one",
        avatar: "../src/assets/images/dp5.png",
        isPrivate: false,
        isVerified: true,
        accountStatus: "active",
        themePreference: "light",
        followerCount:24,
        followingCount:24,
        projectCount:35,
        skills:["React","Backend","DevOps","Cloud computing"],
        socialLinks:[
            {url:"#",icon:"../src/assets/images/instagram.svg"},
            {url:"#",icon:"../src/assets/images/facebook.svg"},
            {url:"#",icon:"../src/assets/images/linkedin.svg"},
            {url:"#",icon:"../src/assets/images/github.svg"},
        ],
        projects : [
            {
                _id:"1", username:"one", title:"talcona solver", thumbnail:"#", collabCount:7, liveLink:"#",
                description:"really nice project about ecosystems", tags:["html","css","js","bootstrap"]
            },
            {
                _id:"2", username:"one", title:"talcona solver", thumbnail:"#", collabCount:7, liveLink:"#",
                description:"really nice project about ecosystems", tags:["html","css","js","bootstrap"]
            },
            {
                _id:"3", username:"one", title:"talcona solver", thumbnail:"#", collabCount:7, liveLink:"#",
                description:"really nice project about ecosystems", tags:["html","css","js","bootstrap"]
            },
            
        ]
    }


    const navigate = useNavigate();
    const { username } = useParams();
    const {user} = useUserContext();

    const[UserFollowers,setUserFollowers] = useState([])
    const[UserFollowing,setUserFollowing] = useState([])
    const[showFollowers,setShowFollowers] = useState(false)
    const[showFollowing,setShowFollowing] = useState(false)
    const[self,setself] = useState(false);
    const[userProjects,setUserProjects] = useState([])
    const[userSavedProjects,setUserSavedProjects] = useState([])
    const[showSavedProjects,setShowSavedProjects] = useState(false)
    const[userData,setUserData] = useState({});
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [savedProjectsLoading, setSavedProjectsLoading] = useState(true);
    const [toNotify,setToNotify] = useState(false);
    const [loading,setLoading] = useState(true);
    
   
    const handleFollow=async()=>{
        try {

            const response = await  axiosInstance.post(`api/user/${userData._id}/follow`)
            console.log(response.data);
            setUserData(prev => ({ ...prev, isFollowing: true }));
        } catch (e) {
            console.log(e);
        }
    }
    const handleUnfollow=async()=>{
        try {
            const response = await axiosInstance.delete(`api/user/${userData._id}/follow`)
            console.log(response.data);
            setUserData(prev => ({ ...prev, isFollowing: false }));
        } catch (e) {
            console.log(e);
        }
    }
    const handleGetFollowers=async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/user/${username}/followers`,{},{withCredentials:true})
            // console.log("Fetched followers raw:", response.data, typeof response.data.followers);
            setUserFollowers(response.data.followers);
        
        } catch (error) {
            console.log(error);
        }
    }
    const handleGetFollowing=async()=>{
        try {
            axios.get(`http://localhost:5000/api/user/${username}/following`,{},{withCredentials:true})
            .then((response)=>{
                console.log(response.data);
                setUserFollowing(response.data);
                console.log(UserFollowing);
            })

            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        async function fetchdata(){
            const response  = await axiosInstance.get(`/api/user/${username}`);
            // console.log("From profile",response.data)
            setUserData(response.data);
            setLoading(false);
        }
        fetchdata();
    },[username])
    useEffect(()=>{
        async function fetchProjects(){
            const response  = await axiosInstance.get(`/api/user/${username}/projects`);
            console.log("From profile:projects",response.data)
            setUserProjects(response.data);
        }
        fetchProjects();
        setProjectsLoading(false);
    },[username])

    const fetchSavedProjects = async()=>{
        const response  = await axiosInstance.get(`/api/user/${username}/saved-projects`);
        console.log("From profile:savedprojects",response.data)
        setUserSavedProjects(response.data);
        setSavedProjectsLoading(false);
    }

    if(loading) return <OpenProjectSkeleton/>
  return (
    <>
        {/* user profile section */}
        <div className='w-full h-[10rem] overflow-hidden bg-blue-400'>
            <img className='w-full object-cover' src={bannerImg}/>
        </div>
        <div className='bg-zinc-100 w-full px-20 py-10 flex items-start font-neue gap-20'>
             
            <div className='relative'>
                {userData&&
                <Avatar  avatar_url={userData.avatar} username={userData.username} width="10rem" height="10rem" className="text-4xl absolute -top-[7rem] border-4 border-white"/>}
                <div className='mt-5'>
                    <h1 className='font-semibold text-2xl mt-16 text-zinc-800 mb-4'>@{userData.username||"loading"}</h1>
                    <h1 className='font-semibold text-5xl capitalize text-zinc-900 mb-4'>{userData.fullName||"loading"}</h1>
                    {/* action buttons */}
                    {!userData.isOwnProfile?(
                    <div className="flex  gap-2">
                        <button onClick={ userData.isFollowing ? handleUnfollow : handleFollow}
                            className={`${userData.isFollowing?"bg-zinc-600":"bg-blue-600"} rounded-lg px-4 py-1 text-white`}>
                            {userData.isFollowing ? "Following" : "Follow"}
                        </button>
                        <button className="bg-zinc-600 rounded-lg px-4 py-1 text-white">
                            Message
                        </button>
                        <div onClick={()=>setToNotify(!toNotify)} className='rounded-lg bg-zinc-600 p-[6px]'>
                            {toNotify?(<img className=" w-6 h-6 object-cover"
                            src={bell_icon}/>):(<img className=" w-[22px] h-[22px] object-cover"
                            src={bell_off}/>)}
                            
                        </div>
                        </div>) 
                        : (
                        <div className="flex gap-2">
                            <Link to={`/user/${userData.username}/edit`} className="bg-blue-500 rounded-lg px-4 py-1 text-white">
                                Edit Profile
                            </Link>
                        </div>
                    )}
                </div>
                <div>
                <h3 className='text-zinc-700 font-semibold mt-4'>Location</h3>
                <h4 className='font-medium text-md capitalize text-zinc-600'>{userData.country||"not specified"}</h4>
                </div>
                <h3 className='text-zinc-700 font-semibold mt-4'>Bio</h3>
                <p className='font-medium text-md text-zinc-600 max-w-[24rem]'>{userData.bio||"Nothing yet"}</p>
            </div>

            <div>
                {/*followers count data*/}
                <div className=" flex gap-5">

                    <div className="flex flex-col justify-center pointer-events-none items-center">
                    <h1 className="text-[1.7rem]">{userData.projectCount}</h1>
                    <h1 className="text-[15px]">Projects</h1>
                    </div>

                    <div onClick={() => {setShowFollowers(true);handleGetFollowers();}}
                    className="flex flex-col justify-center cursor-pointer items-center">
                    <h1 className="text-[1.7rem]">{userData.followerCount}</h1>
                    <h1 className="text-[15px]">Followers</h1>
                    </div>

                    <div onClick={() => {setShowFollowing(!showFollowing);handleGetFollowing();}}
                    className="flex flex-col cursor-pointer justify-center items-center">
                    <h1 className="text-[1.7rem]">{userData.followingCount}</h1>
                    <h1 className="text-[15px]">Following</h1>
                    </div>

                </div>

                {/* user skills */}
                <div className='mt-7'>
                    <h3 className='text-zinc-700 font-semibold mb-2'>Skills</h3>
                    {userData.userSkills?.length>0?
                    (<div className='flex flex-wrap max-w-[20rem] gap-2'>
                        {userData.userSkills.map((skill,i)=>(
                            <div key={i} 
                                className='px-3 text-zinc-800 py-1 rounded-full block border border-zinc-400 bg-purple-200'>
                                {skill}
                            </div>
                        ))}
                    </div>)
                    :
                    (<h1>no skills</h1>)}
                </div>

                {/* social links */}
                {dummyuser.socialLinks.length>0&&<div className='mt-7'>
                <h3 className='text-zinc-700 font-semibold mb-2'>Social Links</h3>
                    <div className='flex gap-2 '>
                    {dummyuser.socialLinks.map((socialLink,i)=>(
                        <div key={i} className='bg-orange-200 rounded-md p-2'
                        onClick={()=>navigate(`${socialLink.url}`)}>
                            <img className='w-4 h-4' src = {socialLink.icon} />
                        </div>
                    ))}
                    </div>
                </div>}
            </div>

        </div>

        {/* project section */}
        <div className='px-20 min-h-[25rem]  text-zinc-800'>
            <div className="font-nb border-b mt-10 border-zinc-400  flex justify-between items-end">
            
            {!userData.isOwnProfile?(<h1 className='text-2xl font-semibold pb-1'>Projects</h1>):(<div className='flex gap-5 '>
                <button onClick={()=>(setShowSavedProjects(false))} className={`text-lg text-zinc-600 hover:text-zinc-800 pb-1 ${showSavedProjects||"border-b-2 border-blue-600 text-zinc-800 transition-colors -mb-[2px]"} font-semibold`}>Projects</button>

                <button onClick={()=>{setShowSavedProjects(true);fetchSavedProjects()}} className={`text-lg text-zinc-600 hover:text-zinc-800 pb-1 ${showSavedProjects&&"border-b-2 text-zinc-800 border-blue-600 -mb-[2px]"} font-semibold`}>Saved Projects</button>
            </div>)}
            
            <h1 className="text-lg font-semibold pb-2">
                <span>Sort by</span>
                <span className="border ml-2 bg-slate-200 p-1 rounded-lg text-[1rem]">
                Latest
                </span>
            </h1>
            </div>
            <div className="mt-10 min-h-[30rem]">
            {showSavedProjects ? (
                savedProjectsLoading ? (
                <div>loading</div>
                ) : userSavedProjects.length > 0 ? (
                <ProjectGrid columns={2} projects={userSavedProjects} />
                ) : (
                <h1 className="font-semibold text-xl mt-10 text-zinc-600">No projects saved yet</h1>
                )
            ) : projectsLoading ? (
                <div>loading</div>
            ) : userProjects.length > 0 ? (
                <ProjectGrid columns={2} projects={userProjects} />
            ) : (
                <h1 className="font-semibold text-xl mt-10 text-zinc-600">No projects to show yet</h1>
            )}
            </div>

        </div>

        <ProfileFooter/>

        {showFollowers && (
            <>
            <div className="absolute font-neue  animate-popping top-[10rem] z-[30] left-[33%] w-[30rem] overflow-hidden rounded-lg border bg-white shadow-lg">
                <div className="border-b px-4 py-2 font-xl font-semibold flex justify-between items-center">
                <h1>Followers List</h1>
                <button
                    onClick={() => {
                    setShowFollowers(false);
                    // document.body.style.overflow = 'auto';
                    }}
                    className="text-3xl text-zinc-500 cursor-pointer -mt-1 mr-2 hover:text-red-400 "
                >
                    &times;
                </button>
                </div>
                <div className="w-full max-h-[15rem]  overflow-y-scroll">
                {UserFollowers.map((follower,index) => (
                <div
                    key={index}
                    className="flex gap-2 items-center border-b px-5 py-2"
                >
                    <div className="flex justify-between w-full items-center">
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Avatar width="36px" height="36px" avatar_url={follower.avatar} username={follower.username}/>
                        </div>
                        <div className="flex flex-col items-start">
                        <button
                            onClick={() => {
                            setShowFollowers(false);
                            navigate(`/user/${follower.username}`);
                            }}
                            className="text-md hover:underline font-semibold text-zinc-800 cursor-pointer"
                        >
                            {follower.username}
                        </button>
                        <h1 className="text-sm font-semibold text-zinc-600">
                            {follower.fullName}
                        </h1>
                        </div>
                    </div>
                    <button className="bg-blue-500 h-[30px] inline-block text-white px-4 rounded-lg">
                        Follow
                    </button>
                    </div>
                </div>
                ))}

                </div>
            </div>
            <div className="absolute top-0 left-0 backdrop-blur-md bg-black z-[25]  h-full w-full opacity-50"></div>
            </>
        )}

    </>
  );
}

export default ProfilePage