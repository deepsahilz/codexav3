import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import CommentSection from './CommentSection.jsx';
import DummyComp from './DummyComp.jsx';
import ProjectOverview from './ProjectOverview.jsx';
import arrow from '../assets/images/arrow_top_right.svg'


const OpenProject = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const tab = searchParams.get("tab") || "overview"; // Default: overview
    const [project,setProject] = useState({});
    const[showComments,setShowComments] = useState(false);
    const [loading,setLoading] = useState(false);
    const [tabLoading,setTabLoading] = useState(false);

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
    },[])

  
    if (loading) return <div className="flex items-center  h-[100vh] justify-center gap-2 text-stone-600">
    <span className="animate-spin w-7 h-7  border-2 border-blue-500 border-t-transparent rounded-full"></span>
    <span className="text-[14px] font-semibold uppercase">Loading...</span>
    </div>

    return (
        <div className=' flex w-full bg-zinc-100 font-neue text-zinc-800'>
        <div className='w-full px-20 pt-8 flex flex-col  gap-3  pb-40'>
            
            {/* header */}
            <div className='basics'>
                <div className='flex  justify-between items-center'>
                    <h1 className='font-bold text-5xl '>{project.title}</h1>
                    <div className='flex gap-5'>
                      <button className=' bg-white hover:bg-blue-600 transition-colors duration-300 border shadow-md flex gap-2 items-center self-start px-4 py-2  rounded-lg'>    
                        <img className='w-6 h-6' src={arrow}/>
                          <span className='font-semibold'>
                              see it Live
                          </span>
                      </button>

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
                </div>
                <div className='flex mt-3 items-center gap-20 mb-2'>
                    <h4 className='font-semibold'>
                        created by  
                        <span 
                        className='text-blue-600 ml-2 cursor-pointer' 
                        onClick={()=>navigate(`/user/${project.AuthorId?.username}`)}>
                            @{project.AuthorId?.username}
                        </span>
                    </h4>
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
            </div>

            {/* static buttons */}
            <div className="flex border-b  border-zinc-300 mb-7 gap-7 font-semibold">
                <button
                // className='border-b-2 border-blue-500'
                className={`${!showComments? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
                onClick={() => setShowComments(false)}
                >
                Overview
                </button>
                <button
                className={`${showComments? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
                onClick={() => setShowComments(true)}
                >
                Comments
                </button>
                
                
            </div>


            {tabLoading?(
              <div className="flex justify-center items-center mt-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ):showComments?(
              <CommentSection/>
            ):(
              project && <ProjectOverview project={project} />
            )}            


        </div>

        </div>
    )
}

export default OpenProject