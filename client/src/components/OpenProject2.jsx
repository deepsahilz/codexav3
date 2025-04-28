import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import CommentSection from './CommentSection.jsx';
import DummyComp from './DummyComp.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import arrow from '../assets/images/arrow_top_right.svg'
import OpenProjectSkeleton from './OpenProjectSkeleton.jsx';
import Loadingspinner from './Loadingspinner.jsx';
import LikeButton from './LikeButton.jsx';
const OpenProject = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const tab = searchParams.get("tab") || "overview"; // Default: overview
    const [project,setProject] = useState({});
    const[showComments,setShowComments] = useState(false);
    const[showCode,setShowCode] = useState(false);
    const[showOverview,setShowOverview] = useState(true);
    const [loading,setLoading] = useState(true);
    const [tabLoading,setTabLoading] = useState(false);

    const [isLiked, setIsLiked] = useState(project.isLiked || false);
    const [isSaved, setIsSaved] = useState(project.isSaved || false);
    const [likeLoading,setLikeLoading]=useState(false)
    const [likeCount, setLikeCount] = useState(project.likeCount||0 );
    const [saveCount, setSaveCount] = useState(project.savedCount||0);

    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProject = async()=>{
          setLoading(true);
            try{
            const response = await axiosInstance.get(`/api/project/${projectId}`)
            console.log("here buddy-->",response.data);
            setProject(response.data)
        }catch(e){
          console.log(e)
        }finally{
          setLoading(false)
        }
      }
      fetchProject();
    },[projectId])

    useEffect(() => {
        if (project && project._id) {
          setIsLiked(project.isLiked || false);
          setIsSaved(project.isSaved || false);
          setLikeCount(project.likeCount || 0);
          setSaveCount(project.savedCount || 0);
        }
      }, [project]);

    //like functions
    const toggleLike = async () => {
        if (likeLoading) return;
        setLikeLoading(true);
        try {
            if (isLiked) {
                await handleUnlike();
                setLikeCount(likeCount - 1);
            } else {
                await handleLike();
                setLikeCount(likeCount + 1);
            }
            setIsLiked(!isLiked);
        } catch (err) {
            console.error(err);
        } finally {
            setLikeLoading(false);
        }
    };
    const handleLike = async () => {
        try {
            await axiosInstance.post(`/api/project/${project._id}/like`);
        } catch (error) {
            console.error("Like failed:", error);
        }
    };
    const handleUnlike = async () => {
        try {
            await axiosInstance.delete(`/api/project/${project._id}/like`);
        } catch (error) {
            console.error("Unlike failed:", error);
        }
    };

    const toggleSave = async () => {
        if (isSaved) {
            await handleUnsave();
            setSaveCount(saveCount - 1);
        } else {
            await handleSave();
            setSaveCount(saveCount + 1);
        }
        setIsSaved(!isSaved);
    };
    const handleSave = async () => {
        try {
            await axiosInstance.post(`/api/project/${project._id}/save`);
        } catch (error) {
            console.error("Save failed:", error);
        }
    };   
    const handleUnsave = async () => {
        try {
            await axiosInstance.delete(`/api/project/${project._id}/save`);
        } catch (error) {
            console.error("Unsave failed:", error);
        }
    };

  
    if (loading) return <OpenProjectSkeleton/>

    return (
      
        <div className=' w-full  font-neue text-zinc-800'>
            <div className='basics px-7 rounded-t-xl py-4  w-full  bg-zinc-100 border-t '>
                
                <div className=' flex justify-between items-center'>
                <div className='authors flex mt-3 items-center gap-20 mb-2'>
                    <div className='font-semibold flex items-center '>
                        {project.title}<span className=' ml-2 text-zinc-600 font-medium'> by</span>  
                        <div 
                        className='text-blue-600 ml-2 flex cursor-pointer gap-2 items-center' 
                        onClick={()=>navigate(`/user/${project.AuthorId?.username}`)}>
                            <Avatar avatar_url={project.AuthorId?.avatar} username={project.AuthorId?.username}  className="ml-2" />
                            <span className=' border-blue-600 text-blue-600 underline-offset-2 '>{project.AuthorId?.username}</span>
                        </div>
                    </div>
                    {project.collaborators?.length > 0 && (
                    <div className="flex items-center">
                        <h3 className="font-semibold mr-5">Collaborators</h3>
                        <div className="flex">
                        {project.collaborators.slice(0, 4).map((collab, index) => (
                            <div
                            key={index}
                            className="w-8 h-8"
                            style={{
                                marginLeft: index > 0 ? '-8px' : '0',
                                zIndex: project.collaborators.length - index,
                                position: 'relative',
                            }}
                            >
                            <Avatar username={collab.userId.username} avatar_url={collab.userId.avatar} />
                            </div>
                        ))}

                        {/* Extra collaborators count */}
                        {project.collaborators.length > 4 && (
                            <div
                            className="w-8 h-8 bg-gray-300 text-white text-xs flex items-center justify-center font-semibold rounded-full"
                            style={{
                                marginLeft: '-8px',
                                zIndex: 0,
                                position: 'relative',
                            }}
                            >
                            +{project.collaborators.length - 4}
                            </div>
                        )}
                        </div>
                    </div>
                )}


                </div>
                    <div className='flex justify-end gap-3 items-center'>
                    <div className='flex items-end gap-[5px] justify-end'>
                        <button onClick={toggleLike} disabled={likeLoading} className={`${likeLoading ? 'opacity-50 cursor-not-allowed' : ''} mb-[6px]`}>

                            {isLiked?(  
                                <svg className='w-[22px] h-[22px]' width="800px" height="800px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-219.000000, -760.000000)" fill="#EC2439">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path d="M163,610.021159 L163,618.021159 C163,619.126159 163.93975,620.000159 165.1,620.000159 L167.199999,620.000159 L167.199999,608.000159 L165.1,608.000159 C163.93975,608.000159 163,608.916159 163,610.021159 M183.925446,611.355159 L182.100546,617.890159 C181.800246,619.131159 180.639996,620.000159 179.302297,620.000159 L169.299999,620.000159 L169.299999,608.021159 L171.104948,601.826159 C171.318098,600.509159 172.754498,599.625159 174.209798,600.157159 C175.080247,600.476159 175.599997,601.339159 175.599997,602.228159 L175.599997,607.021159 C175.599997,607.573159 176.070397,608.000159 176.649997,608.000159 L181.127196,608.000159 C182.974146,608.000159 184.340196,609.642159 183.925446,611.355159" id="like-[#1386]">

                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            ):(
                                <svg className='w-[22px] h-[22px]' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z" fill=" #a1a1aa"/>
                                    </svg>
                            )}
                        </button>
                        <div className='text-[15px] mb-[2px] '>{likeCount}</div>
                    </div>

                    <div className='flex items-center gap-[5px]  -mb-[2px]'>
                    <div className="w-[22px] h-[22px] mb-[3px] cursor-pointer text-[#a1a1aa] hover:text-[#52525b]"
                    onClick={()=>{setShowComments(true);setShowCode(false);setShowOverview(false)}}>
                        <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5,12A9.5,9.5,0,1,0,12,21.5h9.5l-2.66-2.92A9.43,9.43,0,0,0,21.5,12Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.9"/>
                        </svg>
                        </div>

                                        <div className='text-[15px] '>{project.commentCount}</div>
                                    </div>

                <button onClick={toggleSave} className='flex items-center gap-[5px] -mb-[2px]'>
                    {/* <img className={`w-[18px] h-[18px] invert ${isSaved ? 'opacity-100' : 'opacity-50'}`} src={save_icon} /> */}
                    {isSaved ? (
                        <svg className="w-[23px] h-[23px]" viewBox="0 0 24 24" fill="#52525b" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6.2C5 5.08 5 4.52 5.22 4.09C5.41 3.72 5.72 3.41 6.09 3.22C6.52 3 7.08 3 8.2 3H15.8C16.92 3 17.48 3 17.91 3.22C18.28 3.41 18.59 3.72 18.78 4.09C19 4.52 19 5.08 19 6.2V21L12 16L5 21V6.2Z" />
                        </svg>
                        ) : (
                        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke=" #a1a1aa" strokeWidth="2" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6.2C5 5.08 5 4.52 5.22 4.09C5.41 3.72 5.72 3.41 6.09 3.22C6.52 3 7.08 3 8.2 3H15.8C16.92 3 17.48 3 17.91 3.22C18.28 3.41 18.59 3.72 18.78 4.09C19 4.52 19 5.08 19 6.2V21L12 16L5 21V6.2Z" />
                        </svg>
                        )}

                    <div className='text-[15px] -mb-[1px]'>{saveCount}</div>


                
                </button>
                

                    {/* <a title='See it live' target="_blank"
                        rel="noopener noreferrer" href={project.liveLink} className=' transition-opacity'>
                        <div className="w-6 h-6 text-[#a1a1aa] hover:text-[#52525b]">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </div>
                    </a> */}
                    <a target="_blank"
                      rel="noopener noreferrer" href={project.liveLink} className=' bg-zinc-500 text-zinc-100 hover:bg-blue-600 transition-colors duration-300 border flex gap-2 items-center self-start px-4 py-2  rounded-lg'>    
                                            {/* <img className='w-6 h-6' src={arrow}/> */}
                                              <span className='font-medium'>
                                                  see it Live
                                              </span>
                                          </a>
                    </div>
                </div>

            </div>
        <div className='w-full px-7 pt-16 flex flex-col bg-zinc-100  gap-3  border-b  pb-44'>
            
            {/* header */}
                <div className='flex justify-center uppercase items-center'>
                    <h1 className='font-bold text-8xl font-rejouice '>{project.title}</h1>
                    
                </div>

            {/* static buttons */}
            <div className="flex border-b text-xl border-zinc-300 mb-4 gap-7 font-semibold">
                <button
                // className='border-b-2 border-blue-500'
                className={`${showOverview? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
                onClick={() => {setShowOverview(true);setShowComments(false);setShowCode(false)}}
                >
                Overview
                </button>
                <button
                className={`${showComments? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
                onClick={() =>{ setShowComments(true);setShowCode(false);setShowOverview(false);}}
                >
                Comments
                </button>
                <button
                className={`${showCode? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
                onClick={() => {setShowCode(true);setShowComments(false),setShowOverview(false);}}
                >
                Code
                </button>
                
            </div>

            {tabLoading ? (
  <Loadingspinner />
) : showComments ? (
  <CommentSection projectId={project._id} />
) : showCode ? (
  <div className='h-[20rem]'>This feature will be added soon in premium model</div>
) :showOverview?(
  <ProjectOverview project={project} />
):(null) }
         


        </div>
        {/* <div className='w-full h-[20rem] bg-white'>
          <h2 className='text-center w-full p-4 block bg-white shadow-md rounded-lg'>see more related projects- coming soon</h2> 
        </div> */}

        </div>
    )
}

export default OpenProject