import React, { createContext, useState, useContext, useEffect } from "react";
import { useUserContext } from "./UserContextProvider";
import axiosInstance from "../utils/axiosInstance";
const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const {user,isLoggedIn} = useUserContext();

  const [activeChat, setActiveChat] = useState(null);
  const [tempChat,setTempChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages,setMessages] = useState([]);
  const [showChatModal,setShowChatModal] = useState(false);

  useEffect(()=>{
    if(!isLoggedIn) return;
        console.log("fetching chats...")
          const fetchChats = async()=>{
            const res = await axiosInstance.get("/api/chat");
            console.log("fetched chats-->",res.data);
            setChats(res.data);
            // setIsLoading(false);
          }
          fetchChats();
        },[user])    
  

  return (
    <ChatContext.Provider value={{ chats,setChats,setTempChat,tempChat,activeChat,setActiveChat,messages,setMessages,showChatModal,setShowChatModal }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
