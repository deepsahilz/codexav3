import React, { useRef, useState } from 'react'
import { useChatContext } from '../context/ChatContext';
import axiosInstance from '../utils/axiosInstance';
import { useUserContext } from '../context/UserContextProvider';


const ChatInputBar = () => {

    const {user} = useUserContext();
    const {activeChat,setActiveChat,chats,setChats,messages,setMessages} = useChatContext();
    const [newMessage, setNewMessage] = useState('');

    const createChat = async (chatData) => {
        try {
          const memberIds = chatData.members.map((member) => member.user._id);
          const res = await axiosInstance.post("/api/chat", {
            content: newMessage,
            members: memberIds,
            senderId: user.id,
          });
          return res.data; 
        } catch (error) {
          console.error("Failed to create chat:", error);
          return null;
        }
      };
      
      const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
    
        if (activeChat.isTemp) {
            const createdChat = await createChat(activeChat);
            console.log("need to check", createdChat);
            setChats([createdChat, ...chats]);
            setActiveChat(createdChat);
            setNewMessage('');
            return;
        }
    
        try {
            const res = await axiosInstance.post(`/api/chat/${activeChat._id}/messages`, {
                content: newMessage,
                senderId: user.id,
                chatId: activeChat._id,
            });
            console.log("message sent", res.data);
            
            // Update messages state
            setMessages([...messages, res.data]);
            setNewMessage('');
    
            // Update latest message in the chat list
            const updatedChats = chats.map((chat) => {
                if (chat._id === activeChat._id) {
                    return { ...chat, latestMessage: res.data};  // Update latestMessage
                }
                return chat;
            });
            console.log("updates chats::",updatedChats)
    
            // Set updated chats back to the state
            setChats(updatedChats);
    
        } catch (e) {
            console.log("error sending message:", e);
        }
    
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
// hey, can u create a doodle art background, light mode. actuallly i want a similar doodle background like whatsapp have in their chat background. make sure the doodles are cool,expressive and related to tech and code somehow. not much big, a bit small, same size like whatsapp's.
export default ChatInputBar