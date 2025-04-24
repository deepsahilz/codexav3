import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import { useChatContext } from '../context/ChatContext';
import { useUserContext } from '../context/UserContextProvider';
import axiosInstance from '../utils/axiosInstance';
import { useSocket } from '../context/SocketContext';

const ChatList = () => {
  console.log("Rendering chatlist")

    const {activeChat,setActiveChat,chats,setChats,setMessages,setShowChatModal} = useChatContext();
    const { onlineUsers } = useSocket();
  
    const tabs = [
        { id: 'all', label: 'all' },
        { id: 'chats', label: 'chats' },
        { id: 'groups', label: 'groups' }
      ];//l

    const {user} = useUserContext();
    
    const [activeTab, setActiveTab] = useState('all');
    const [query, setQuery] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const { socket } = useSocket(); // Make sure socket is available from your context

    // useEffect(()=>{
    //   console.log("fetching chats...")
    //     const fetchChats = async()=>{
    //       const res = await axiosInstance.get("/api/chat");
    //       console.log("fetched chats-->",res.data);
    //       setChats(res.data);
    //       // setChats(dummyChats);
    //       setIsLoading(false);
    //     }
    //     fetchChats();
    //   },[user])   
    

    useEffect(() => {
      if (!socket) return;
    
      const handleNewMessage = (newMessage) => {
        console.log("New message received:", newMessage);
    
        // If message is for the active chat, update messages list
        if (activeChat?._id === newMessage.chatId) {
          setMessages(prev => [...prev, newMessage]);
        }
    
        // Update latestMessage in chat list
        setChats(prevChats =>
          prevChats.map(chat =>
            chat._id === newMessage.chatId
              ? { ...chat, latestMessage: newMessage }
              : chat
          )
        );
      };
    
      socket.on("new-message", handleNewMessage);
    
      return () => {
        socket.off("new-message", handleNewMessage);
      };
    }, [socket, activeChat, setChats, setMessages]);
    

    const filteredChats = chats.filter(chat => {
      const isGroup = chat.isGroupChat;
      const otherUser = chat.members.find(m => m.user._id !== user.id);
      const nameMatch = isGroup
        ? chat.groupName.toLowerCase().includes(query.toLowerCase())
        : otherUser?.user.fullName.toLowerCase().includes(query.toLowerCase());
    
      if (activeTab === 'all') return nameMatch;
      if (activeTab === 'chats') return !isGroup && nameMatch;
      if (activeTab === 'groups') return isGroup && nameMatch;
    });
    
    
    
    return (
        <div className="w-[23rem] min-w-[23rem] bg-white border-r flex flex-col h-full">

            {/*Local Search */}
            <div className="pl-7 w-full pt-5 pr-5 flex gap-2">
                <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none"
                    value={query}
                    onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                    }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
                <button className='p-1 rounded-lg bg-purple-300 w-10 flex text-xl items-center justify-center'
                onClick={()=>{setShowChatModal(true)}}>
                    {/* show modal---->new chat ||group chat*/}
                    {/* -->new chat--->open chat box, let him msg,{handlesendmessage}  */}
                    +
                </button>
            </div>

            {/* TABS */}
            <div className="pl-7 pt-3 border-b">
                <div className="flex mt-2 space-x-4 border-b items-center">
                {tabs.map((tab,index) => (
                    <button 
                    key={index}
                    className={`pb-2 px-1 uppercase text-xs font-medium transition-all ${
                        activeTab === tab.id 
                        ? 'border-b-2 border-purple-500 text-purple-500' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    >
                    {tab.label}
                    </button>
                ))}
                </div>
            </div>
            
            {/* CHAT-LIST */}
            {chats.length > 0 ? 
            <div className="flex-1 overflow-y-auto max-h-full">
                {filteredChats?.map((chat) => {
                  const otherUser = chat.members.find(m => m.user._id !== user.id);
                  const isOnline = onlineUsers.includes(otherUser?.user._id); 
                return (
                    <div
                    key={chat._id}
                    className={`py-3 pl-7 pr-5 border-b flex items-center cursor-pointer transition-all hover:bg-gray-50 ${
                        activeChat&&activeChat.id === chat.id ? "bg-purple-50" : ""
                    }`}
                    onClick={() => {setActiveChat(chat);console.log(chat);}}
                    >
                    <div className="relative mr-3">
                        <Avatar avatar_url={otherUser.user.avatar}  username={otherUser.user.username} width="42px" height="42px"/>
                        {isOnline&&<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-sm">{otherUser.user.fullName}</h3>
                        <span className="text-xs text-gray-500">
                            {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            })} 
                        </span>
                        
                        </div>
                        <div className='flex items-center'> 
                        <p className="text-sm text-gray-500 truncate">{chat.latestMessage.content}</p>
                        {!chat.latestMessage.isRead && chat.latestMessage.senderId._id !== user.id && (
                          <div className="ml-2 w-2 h-2 bg-blue-700 mt-1 rounded-full flex items-center justify-center">
                            {/* Blue dot for unread message not sent by self */}
                          </div>
                        )}

                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            :(<div className='text-center mt-10 text-zinc-500 font-semibold'>no chats to show</div>)
            }

        </div>
                
    )
    }

export default ChatList