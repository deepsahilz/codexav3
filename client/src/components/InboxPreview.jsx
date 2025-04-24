import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Avatar from "../components/Avatar";
import { timeAgo } from '../utils/utilityFunctions';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import { useUserContext } from '../context/UserContextProvider';
import LoadingSpinner from './LoadingSpinner';

const InboxPreview = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const {chats,setChats,activeChat,setActiveChat} = useChatContext();
    // const [isLoading, setIsLoading] = useState(false); // Track loading state


// useEffect(()=>{
//       console.log("fetching chats...")
//         const fetchChats = async()=>{
//           const res = await axiosInstance.get("/api/chat");
//           console.log("fetched chats-->",res.data);
//           setChats(res.data);
//           // setChats(dummyChats);
//           setIsLoading(false);
//         }
//         fetchChats();
//       },[user])    



  return (
    <div className='w-full  flex flex-col text-zinc-900'>
      <div className='w-full font-semibold border-b py-2 text-center'>Your Inbox</div>
      {!chats ? (<LoadingSpinner/>) : chats.length > 0 ? (
        <div className='flex flex-col h-[17rem] overflow-hidden overflow-y-auto'>
          {chats.map((chat, index) => {
            const otherUser = chat.members.find(m => m.user._id !== user.id);
            return (
                <div
                key={chat._id}
                className={`py-2 px-5 border-b flex items-center cursor-pointer transition-all hover:bg-gray-50 ${
                    activeChat&&activeChat.id === chat.id ? "bg-purple-50" : ""
                }`}
                onClick={() => {setActiveChat(chat);console.log(chat);}}
                >
                <div className="relative mr-3">
                    <Avatar avatar_url={otherUser.user.avatar}  username={otherUser.user.username} width="32px" height="32px"/>
                    {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div> */}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-sm">{otherUser.user.fullName}</h3>
                    <span className="text-xs text-gray-500">
                        {timeAgo(chat.latestMessage.createdAt)}
                        {/* {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}  */}
                    </span>
                    
                    </div>
                    <div className='flex justify-between items-end'>
                    <p className="text-sm text-gray-500 truncate">{chat.latestMessage.content}</p>
                    {

                    !chat.latestMessage?.isRead 
                    && 
                    chat.latestMessage.senderId?._id !== user.id &&
                    // activeChat._id !== chat._id&&
                     (
                          <div className="ml-2 w-2 min-w-2 h-2 bg-blue-700 mt-1 rounded-full flex items-center justify-center">
                            {/* Blue dot for unread message not sent by self */}
                          </div>
                        )}
                    </div>
                </div>
                </div>
            );
            })}
        </div>
      ) : (
        <div className='h-[10rem] p-5 flex justify-center items-center'>No notifications to show</div>
      )}
    </div>
  );
};

export default InboxPreview;
