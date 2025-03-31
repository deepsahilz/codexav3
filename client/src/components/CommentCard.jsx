import React, { useState } from 'react'
import Avatar from './Avatar'
import axiosInstance from '../utils/axiosInstance.js';
import LikeButton from './LikeButton';
import CommentBar from './CommentBar';

const CommentCard = ({comment}) => {

    const dummyReplies = [
        
        {
          "_id": "660d9a1d5f8b2c001f5e4a04",
          "parentId": "660d9a1a5f8b2c001f5e4a01",
          "userId": "660d9a1e5f8b2c001f5e4a05",
          "username": "code_warrior",
          "avatarUrl": "https://example.com/avatars/code_warrior.jpg",
          "projectId": "660d9a1c5f8b2c001f5e4a03",
          "content": "Thanks! I really appreciate it. 😊",
          "gifUrl": "https://example.com/gifs/thank-you.gif",
          "createdAt": "2025-03-30T12:05:00.000Z",
          "updatedAt": "2025-03-30T12:05:00.000Z"
        },
       
        {
          "_id": "660d9a225f8b2c001f5e4a08",
          "parentId": "660d9a205f8b2c001f5e4a06",
          "userId": "660d9a235f8b2c001f5e4a09",
          "username": "backend_guru",
          "avatarUrl": "https://example.com/avatars/backend_guru.jpg",
          "projectId": "660d9a1c5f8b2c001f5e4a03",
          "content": "I think it's done using CSS animations!",
          "gifUrl": null,
          "createdAt": "2025-03-30T12:15:00.000Z",
          "updatedAt": "2025-03-30T12:15:00.000Z"
        },
        
        {
          "_id": "660d9a265f8b2c001f5e4a12",
          "parentId": "660d9a245f8b2c001f5e4a10",
          "userId": "660d9a275f8b2c001f5e4a13",
          "username": "dev_master",
          "avatarUrl": "https://example.com/avatars/dev_master.jpg",
          "projectId": "660d9a1c5f8b2c001f5e4a03",
          "content": "Thanks for reporting! I'll fix it soon. 🙌",
          "gifUrl": "https://example.com/gifs/fix-it.gif",
          "createdAt": "2025-03-30T12:25:00.000Z",
          "updatedAt": "2025-03-30T12:25:00.000Z"
        },
        
        
      ]
    const [showReplies,setShowReplies]=useState(false);
    const [replies,setReplies]=useState([]);
    const [repliesLoading,setRepliesLoading]= useState(true);
    const [showReplyInput,setShowReplyInput] = useState(false);

    const getReplies=async(parentId)=>{
        setRepliesLoading(true);
        try{
            const {data} = await axiosInstance.get(`/api/comment/${parentId}/replies`);
            // console.log(data);
            setReplies(data);
        }catch(e){
            console.log(e)
        }finally{
            setRepliesLoading(false);
            setShowReplies(true);

        }
    }
    
  return (
    <div className='rounded-lg bg-zinc-50 border py-3 px-7 font-nb'>
        <div className='flex items-start gap-3 '>
            <Avatar username={comment.username} avatar_url={comment.avatar} width={30} height={30}/>
            <div className='flex flex-col w-full'>
                <div className='flex items-center gap-4 mt-[1px]'>
                    <h2 className='font-semibold'>{comment.username}</h2>
                    <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                    </span>
                </div>
                <p>{comment.content}</p>

                <div className='w-full'>
                        <div className='flex items-center gap-3'>
                            <LikeButton isLiked={false} onClick={()=>{}} likeCount={23} outlineColor="#AAA"/>
                            <button onClick={()=>{setShowReplyInput(!showReplyInput)}}>{showReplyInput?"cancel":"reply"}</button>
                        </div>
                        {showReplyInput&&<CommentBar projectId={comment.projectId} setComments={setReplies} commentId={comment._id} placeholder={`reply to @${comment.username}`}/>}

                        {showReplies&&<button className='text-blue-600 hover:text-zinc-500' onClick={()=>setShowReplies(false)}>hide replies</button>}
                        {showReplies||<button className='text-blue-600 hover:text-zinc-500' onClick={()=>getReplies(comment._id)}>show replies</button>}
                        
                        {showReplies&&<div className='flex flex-col gap-1 border-l-2 border-zinc-300 mt-2 pl-5'>
                        {repliesLoading?
                        (<div>loading...</div>):(
                            replies?.map((reply,index)=>(
                                <CommentCard key={index} comment={reply} />
                            )))}
                        </div>}
                </div>

            </div>
        </div>
        
    </div>
    
  )
}

export default CommentCard