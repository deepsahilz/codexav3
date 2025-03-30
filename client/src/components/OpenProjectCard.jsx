import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar.jsx';


const OpenProjectCard = () => {
    const[project,setProject] = useState({});
    const [loading,setLoading] = useState(false);
    const { projectId } = useParams();
    useEffect(()=>{
        const fetchProject = async()=>{
          setLoading(true);
            try{
            const response = await axiosInstance.get(`/api/project/${projectId}`)
            console.log(response.data);
            setProject(response.data)
        }catch(e){
          console.log(e)
        }finally{
          setLoading(false)
        }
      }
      fetchProject();
    },[])

  
    if (loading) return <div className="flex items-center  h-[100vh] justify-center gap-2 text-stone-600">
    <span className="animate-spin w-7 h-7  border-2 border-blue-500 border-t-transparent rounded-full"></span>
    <span className="text-[14px] font-semibold uppercase">Loading...</span>
    </div>

    return (
        <div className=' flex w-full bg-zinc-100 font-neue text-zinc-800'>
        <div className='w-full px-10 pt-10 flex flex-col  gap-3  pb-40'>
            <div className='flex justify-between items-center'>
            <h1 className='font-bold text-5xl '>{project.title}</h1>
            <button className=' bg-white border shadow-md flex gap-2 items-center self-start px-4 py-2  rounded-lg'>    
                <svg className='w-5 h-5' version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                <path fill="#231F20" d="M52,24h-4v-8c0-8.836-7.164-16-16-16S16,7.164,16,16v8h-4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h40
                    c2.211,0,4-1.789,4-4V28C56,25.789,54.211,24,52,24z M32,48c-2.211,0-4-1.789-4-4s1.789-4,4-4s4,1.789,4,4S34.211,48,32,48z M40,24
                    H24v-8c0-4.418,3.582-8,8-8s8,3.582,8,8V24z"/>
                </svg>
                <span className='font-semibold'>
                    view code
                </span>
            </button>
            </div>

            <div className='flex items-center gap-20 mb-2'>
                <h4 className='font-semibold'>created by <span className='text-blue-600'>@{project.AuthorId?.username}</span></h4>
                {project.collaborators?.length>0?(
                <div className='flex items-center'>
                <h3 className='font-semibold mr-5'>Collaborarors</h3>
                {project.collaborators.map((collab,index)=>(
                    
                    <div key={index} className={`w-8 h-8 ${index>0&&"-translate-x-2"}`}>
                        <Avatar username={collab.userId.username} avatar_url={collab.userId.avatar}/>
                    </div>
                    // <h4>yo{collab.userId.username}</h4> 
                    
                ))}
                </div>
            ):(<h4>no collabs</h4>)}
            </div>
            
            <div>
                <img className=' h-[20rem]' src={`http://localhost:5000/${project.thumbnail}`}/>
            </div>
            <p className='text-zinc-600 '>{project.description}</p>
            
            
            

            <h3 className='font-semibold mb-2'>Media</h3>
            {project.mediaFiles?.length>0?(
                <div className='flex gap-5 overflow-y-auto'>
                {project.mediaFiles.map((url)=>(
                    <div className='min-w-[25rem] h-[20rem]'>
                        <img className="w-full h-full object-cover" src={`http://localhost:5000/${url}`}/>
                    </div>
                ))}
                </div>
            ):(<h4>no collabs</h4>)}


        </div>
        <div className='w-[40%] bg-zinc-50 border p-10 overflow-y-scroll sticky h-[90vh] top-[58px] right-0 rounded-xl shadow-lg'>
                    <div className='flex justify-between items-start mb-5'>
                        <h1 className='font-semibold'>//Comments section</h1>
                        <h1 className='-mt-1 text-2xl hover:text-red-600 cursor-pointer'>&times;</h1>
                    
                    </div>
                    <div>
                        <h2 className=''><span className='text-blue-600'>@Nikhil234</span> commented</h2>
                        <h2 className='ml-7'><span className='text-blue-600'>@dosanjhx1</span> you did a great job paaji.</h2>
                    </div>
        </div>
        </div>
    )
}

export default OpenProjectCard