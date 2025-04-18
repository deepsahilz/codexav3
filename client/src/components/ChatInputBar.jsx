import React, { useRef, useState } from 'react'
import { useChatContext } from '../context/ChatContext';
import axiosInstance from '../utils/axiosInstance';

const ChatInputBar = () => {

    const {activeChat,setActiveChat,chats,setChats,messages,setMessages} = useChatContext();
    const [newMessage, setNewMessage] = useState('');

    const createChat = async (chatData) => {
        console.log(chatData);
        try {
          const res = await axiosInstance.post("/api/chat/new", {
            isGroup: chatData.isGroup,
            groupName: chatData.groupName,
            groupAvatar: chatData.groupAvatar,
            members: chatData.members, // [{ user: id, role: "admin" | "member" }]
          });
          return res.data; // the created chat
        } catch (error) {
          console.error("Failed to create chat:", error);
          return null;
        }
      };
      

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        console.log("welcome")
      
        if (activeChat.isTemp) {
            // console.log(activeChat);
          const createdChat = await createChat(activeChat);
      
          if (createdChat) {
            setChats([createdChat, ...chats]);
            setActiveChat(createdChat);
            // Optionally send the first message here
          }
      
          setNewMessage('');
          return;
        }
      
        // Normal message sending logic here (existing chat)
        setNewMessage('');
      };    
      
    
    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
    };

    return (
        <div className="p-3 pb-4 border-t bg-white absolute bottom-0 w-full">
            <div className="flex items-center bg-zinc-200 rounded-lg px-4">
            <input
                type="text"
                placeholder="Type a message here..."
                className="flex-1 bg-transparent py-3 focus:outline-none text-sm"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <div className="flex space-x-2 ml-2">
                <button 
                className={`p-2 rounded-full ${
                    newMessage.trim() === '' 
                    ? 'text-gray-400' 
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ''}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    )
}

export default ChatInputBar