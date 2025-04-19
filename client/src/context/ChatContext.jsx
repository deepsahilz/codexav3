import React, { createContext, useState, useContext, useEffect } from "react";
const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages,setMessages] = useState([]);
  const [showChatModal,setShowChatModal] = useState(false);
  

  return (
    <ChatContext.Provider value={{ chats,setChats,activeChat,setActiveChat,messages,setMessages,showChatModal,setShowChatModal }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
