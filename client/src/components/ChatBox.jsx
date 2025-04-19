import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import ChatInputBar from './ChatInputBar';
import axiosInstance from '../utils/axiosInstance';
import { useChatContext } from '../context/ChatContext';
import { useUserContext } from '../context/UserContextProvider';

const ChatBox = () => {

  const {user} = useUserContext();
  const {activeChat,setActiveChat,chats,setChats,messages,setMessages} = useChatContext();
  
  const dummyMessages=[
    {chatId:"11",
      sender:{
        id:"1212",
        username:"karan",
        name:"karan",
        avatar:"nono"
      },
      text:"kidaaaa",
      createdAt:"12 wnekw"
    },
    {chatId:"12",
      sender:{
        id:"1213",
        username:"karan",
        name:"karan",
        avatar:"nono"
      },
      text:"kidaaaa fer",
      createdAt:"12 wnekw"
    },
  ]
  const [isLoading,setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const currentUserId='67eb0271566282aa1eebf4f6';  // Replace with context later

  useEffect(()=>{
    const fetchMessages = async()=>{
      // const res = await axiosInstance.get("/api/chat/:chatId/messages");
      // console.log(res.data);
      // setMessages(res.data);
      setMessages(dummyMessages);
      setIsLoading(false);
    }
    fetchMessages();
  },[activeChat])


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, messages]);


    const ChatHeader =({chat})=>{
      const otherUser = chat.members.find(m => m.user._id !== user.id);


        return(
            <div className="p-4 bg-white border-b flex items-center justify-between ">
            <div className="flex items-center">
              <div className="relative mr-3">
                
                  <Avatar username={otherUser.user.username} width="42px" height="42px"  />
                
              </div>
              <div>
                <h3 className="font-medium text-sm ">{otherUser?.user.fullName}</h3>
                <p className="text-xs text-gray-500">New conversation</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        )
    }
    const RenderMessage=({message,index})=>{
      console.log(message.sender.id);
      const mymessage = (message.sender.id == currentUserId);
      console.log(mymessage);
      return(
        <div 
                key={index} 
                className={`flex mb-4 ${mymessage? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-[1.5rem] px-4 py-2 ${
                    mymessage 
                      ? 'bg-purple-600 text-white rounded-br-none animate-fade-in-right' 
                      : 'bg-white shadow-md text-gray-800 rounded-bl-none animate-fade-in-left'
                  }`}
                  style={{
                    animationDuration: '0.3s',
                    animationFillMode: 'both',
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className={`text-xs mt-1 text-right ${
                    mymessage? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {message.createdAt}
                  </div>
                </div>
              </div>
      )
    }

    if(!activeChat)
      return (
      <div className="flex items-center justify-center h-full w-full  text-gray-500">
        <p>Select a chat or start new</p>
      </div>)

    return (
        <div className="flex-1 flex flex-col relative bg-zinc-100">

          <ChatHeader chat={activeChat}/>
          
          {activeChat.isTemp?
            <div className="flex items-center justify-center h-full  text-gray-500">
              <p>Send a message to start the conversation</p>
            </div>
            :

            isLoading?
            <div>Loading messages...</div>
            :
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50" >
              {messages.length>0&&messages.map((m,index) => (
                  // console.log(m)
                  <RenderMessage message={m} index={index} />
              ))}
              {/* <div ref={messagesEndRef} /> */}
            </div>}
          
          <ChatInputBar />

        </div>
      );
}

export default ChatBox