import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import CommentCard from './CommentCard';
import CommentBar from './CommentBar';

const CommentSection = ({projectId}) => {
  

  const [loading,setLoading]=useState(true);
  const [comments,setComments] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchParentComments = async (projectId) => {
        try {
            const { data } = await axiosInstance.get(`/api/project/${projectId}/comment`);
            console.log(data);
            setComments(data);
        } catch (error) {
            console.log(error);
        }finally{
          setLoading(false);
        }}
         

    fetchParentComments(projectId);

}, [projectId]);

  

  
  
  // if (loading) return <div className="flex items-center  h-[100vh] justify-center gap-2 text-stone-600">
  //   <span className="animate-spin w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full"></span>
  //   <span className="text-[14px] font-semibold uppercase">Loading...</span>
  //   </div>
  
  return (
    <div className=''>
      <CommentBar projectId={projectId} setComments={setComments}/>  
      {loading?(
        <div className="flex items-center h-[20rem] justify-center gap-2 text-stone-600">
        <span className="animate-spin w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full"></span>
        <span className="text-[14px] font-semibold uppercase">Loading...</span>
        </div>
      ):(
        <div className='flex flex-col gap-2 '>
        {comments.map((comment,index)=>(
          <CommentCard key={index} comment={comment}/>
        ))}
      </div>
      )}
      
    </div>
  )
}

export default CommentSection