import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import CommentCard from './CommentCard';

const CommentSection = ({projectId}) => {
  const dummyComments = [
    {
      "_id": "660d9a1a5f8b2c001f5e4a01",
      "parentId": null,
      "userId": "660d9a1b5f8b2c001f5e4a02",
      "username": "dev_master",
      "avatarUrl": "https://example.com/avatars/dev_master.jpg",
      "projectId": "660d9a1c5f8b2c001f5e4a03",
      "content": "This is an amazing project!",
      "gifUrl": null,
      "createdAt": "2025-03-30T12:00:00.000Z",
      "updatedAt": "2025-03-30T12:00:00.000Z"
    },
    {
      "_id": "660d9a205f8b2c001f5e4a06",
      "parentId": null,
      "userId": "660d9a215f8b2c001f5e4a07",
      "username": "frontend_wiz",
      "avatarUrl": "https://example.com/avatars/frontend_wiz.jpg",
      "projectId": "660d9a1c5f8b2c001f5e4a03",
      "content": "How did you achieve this effect?",
      "gifUrl": null,
      "createdAt": "2025-03-30T12:10:00.000Z",
      "updatedAt": "2025-03-30T12:10:00.000Z"
    },
    
    {
      "_id": "660d9a245f8b2c001f5e4a10",
      "parentId": null,
      "userId": "660d9a255f8b2c001f5e4a11",
      "username": "bug_hunter",
      "avatarUrl": "https://example.com/avatars/bug_hunter.jpg",
      "projectId": "660d9a1c5f8b2c001f5e4a03",
      "content": "I found a small bug when resizing the window.",
      "gifUrl": null,
      "createdAt": "2025-03-30T12:20:00.000Z",
      "updatedAt": "2025-03-30T12:20:00.000Z"
    },
   
    {
      "_id": "660d9a325f8b2c001f5e4a18",
      "parentId": null,
      "userId": "660d9a335f8b2c001f5e4a19",
      "username": "data_nerd",
      "avatarUrl": "https://example.com/avatars/data_nerd.jpg",
      "projectId": "660d9a1c5f8b2c001f5e4a03",
      "content": "What database are you using for this?",
      "gifUrl": null,
      "createdAt": "2025-03-30T12:40:00.000Z",
      "updatedAt": "2025-03-30T12:40:00.000Z"
    }
  ]

  const [loading,setLoading]=useState(true);
  const [comments,setComments] = useState([]);

  useEffect(()=>{
    setLoading(true);
    const fetchParentComments = async(projectId)=>{
      const data = axiosInstance.get(`/api/project/${projectId}/comments`)
    }

    const fetchReplies=async(parentId)=>{
      const data = axiosInstance.get(`/api/comments/${parentId}`)
    }

    try{
      setComments(dummyComments);
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
    }
  },[])
  
  if (loading) return <div className="flex items-center  h-[100vh] justify-center gap-2 text-stone-600">
    <span className="animate-spin w-7 h-7  border-2 border-blue-500 border-t-transparent rounded-full"></span>
    <span className="text-[14px] font-semibold uppercase">Loading...</span>
    </div>
  
  return (
    <div className='flex flex-col gap-2 '>
      {comments.map((comment,index)=>(
        <CommentCard key={index} comment={comment}/>
      ))}
    </div>
  )
}

export default CommentSection