import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import like_icon from '../assets/images/like_icon.svg'
import comment_icon from '../assets/images/comment_icon.svg'
import arrow_icon from '../assets/images/arrow_top_right.svg'
import verified_badge from "../assets/images/verified.svg"
import save_icon from "../assets/images/bookmark.svg"
import Avatar from './Avatar'
import axiosInstance from '../utils/axiosInstance.js'
import TagList from './TagList.jsx'



const ProjectCard = ({project,...props}) => {
    const [isLiked, setIsLiked] = useState(project.isLiked || false);
    const [likeCount, setLikeCount] = useState(project.likeCount || 0);
    const navigate= useNavigate();

    const toggleLike = async () => {
        if (isLiked) {
            await handleUnlike();
            setLikeCount(likeCount - 1);
        } else {
            await handleLike();
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
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

    return (
    <div className='flex flex-col gap-2 h-full w-full'
    >
        <div className='w-full h-full cursor-pointer group relative  rounded-lg overflow-hidden  '>

            <div onClick={()=>{navigate(`/project/${project._id}`)}} className='opacity-30 transition-opacity  group-hover:opacity-40 bg-black h-full w-full absolute' />

            <div className='absolute top-3 text-white pl-4 pr-5 w-full flex justify-between items-center gap-2'>
                
                <div className='flex gap-2'>
                    {<div className="w-7 h-7 rounded-full overflow-hidden shadow-lg">
                        <Avatar username={project.AuthorId.username} avatar_url={project.AuthorId.avatar}/>
                    </div>}

                    {project.AuthorId.username && 
                    <div className='flex items-center gap-2'>
                    <Link to={`/user/${project.AuthorId.username}`} className='hover:underline font-semibold text-sm flex items-center  cursor-pointer '>
                        <h4 className=''>{project.AuthorId.username}</h4>
                        {project.AuthorId.isVerified&&<img className='w-5 h-5' src ={verified_badge}/>}
                    </Link>
                    {project.collaborators.length>0 &&<span className='text-zinc-300 font-medium text-sm '>+{project.collaborators.length} more</span>}
                    </div>
                    }
                </div>

                <a title='See it live' className='opacity-0 group-hover:opacity-100 transition-opacity'>
                    <div className='w-6 h-6 flex justify-center items-center rounded-md borderborder-blue-600 bg-blue-600'>
                        <img className='invert w-5 h-5 ' src={arrow_icon}/>
                    </div>
                </a>
            </div>

            <div className=' transition-all flex justify-between w-full absolute left-4 pr-8 bottom-3 text-white'>
                <div className='flex gap-3'>

                <div className='flex items-end gap-[5px] justify-end'>
                    <button  onClick={toggleLike}>
                        {isLiked?(  
                            <svg className='w-[18px] h-[18px]' width="800px" height="800px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
                            <svg className='w-[18px] h-[18px]' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z" fill="#fff"/>
                                </svg>
                        )}
                    </button>

                    <div className='text-[12px] -mb-[2px]'>{likeCount}</div>
                </div>
                
                <div className='flex items-center gap-[5px] -mb-[2px]'>
                    <img className='w-[18px] h-[18px] invert ' src={comment_icon} /> 
                    <div className='text-[12px] -mb-[2px]'>24</div>
                </div>
                </div>
                <div className='flex items-center gap-[5px] -mb-[2px]'>
                    <img className='w-[18px] h-[18px] invert ' src={save_icon} /> 
                    <div className='text-[12px] -mb-[2px]'>24</div>
                </div>
            </div>
            
            <img 
            src={`http://localhost:5000/${project.thumbnail}`} 
            // src="#" 
            className='object-cover w-full h-full'
            />
            
        </div>
        
        <div className='ml-1 space-y-2'>
            <a href='#'>
                <h1 className='text-[1.4rem] font-nb text-zinc-700 mt-2 font-semibold leading-none  capitalize'>{project.title}</h1>
            </a>
            <p className='text-stone-500 line-clamp-1 min-h-[1.5rem]'>{project.description}</p>
            {/* <p className='text-stone-500 line-clamp-2 min-h-[3rem]'>{project.description}</p> */}
            
            {/* <div className='flex flex-wrap gap-2'>
                {project.tags?.slice(0, 3).map((tag, j) => (
                    <div key={j} className='border text-[14px] pointer-events-none whitespace-nowrap text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full'>
                    {tag}
                    </div>
                ))}
                {project.tags?.length > 3 && (
                    <div className='border text-[14px] pointer-events-none whitespace-nowrap bg-zinc-300 text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full'>
                    +{project.tags.length - 3} more
                    </div>
                )}
            </div> */}
            <TagList tags={project.tags} />


        </div>

    </div>
  )
}

export default ProjectCard