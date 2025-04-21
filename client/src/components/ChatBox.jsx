import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import ChatInputBar from './ChatInputBar';
import axiosInstance from '../utils/axiosInstance';
import { useChatContext } from '../context/ChatContext';
import { useUserContext } from '../context/UserContextProvider';
import { messageTime, formatDate } from '../utils/utilityFunctions';

const ChatBox = () => {

  const { user } = useUserContext();
  const { activeChat, setActiveChat, chats, setChats, messages, setMessages } = useChatContext();

  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!activeChat || activeChat.isTemp) return;

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/api/chat/${activeChat._id}/messages`);
        setMessages(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [activeChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, messages]);

  useEffect(() => {
    const markAllRead = async () => {
      if (!activeChat||activeChat.isTemp) return;
      if (activeChat.latestMessage.isRead) {console.log("leaving");return};

      try {
        await axiosInstance.post(`/api/chat/${activeChat._id}/mark-read`);
        console.log("marked all messages as read");
        setChats(prev =>
          prev.map(chat =>
            chat._id === activeChat._id? {...chat,latestMessage: {...chat.latestMessage,isRead: true,},}: chat
          )
        );
      } catch (err) {
        console.error("Failed to mark messages as read", err);
      }
    };
  
    markAllRead();
  }, [activeChat]);
  
  

  const ChatHeader = ({ chat }) => {
    const otherUser = chat.members.find(m => m.user._id !== user.id);
    return (
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Avatar avatar_url={otherUser.user.avatar} username={otherUser.user.username} width="42px" height="42px" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{otherUser?.user.fullName}</h3>
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
    );
  };

  const RenderMessage = ({ message, index }) => {
    const mymessage = message.senderId._id === user.id;
    return (
      <div key={message._id} className={`flex mb-4 ${mymessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs md:max-w-md rounded-[1.5rem] px-4 py-2 ${mymessage ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white shadow-md text-gray-800 rounded-bl-none'}`}>
          <p className="text-sm">{message.content}</p>
          <div className={`text-xs mt-1 text-right ${mymessage ? 'text-purple-200' : 'text-gray-500'}`}>
            {messageTime(message.createdAt)}
          </div>
        </div>
      </div>
    );
  };

  if (!activeChat) return (
    <div className="flex items-center justify-center h-full w-full text-gray-500">
      <p>Select a chat or start new</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col relative bg-zinc-100">
      <ChatHeader chat={activeChat} />
  
      {activeChat.isTemp ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Send a message to start the conversation</p>
        </div>
      ) : isLoading ? (
        <div>Loading messages...</div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 mb-[4.2rem]">
          {messages.length > 0 &&
            messages.map((m, index) => {
              const prev = messages[index - 1];
              const showDate =
                index === 0 ||
                new Date(m.createdAt).toDateString() !==
                  new Date(prev.createdAt).toDateString();
  
              return (
                <React.Fragment key={m._id}>
                  {showDate && (
                    <div className="flex justify-between gap-2 text-zinc-600 text-xs my-2">
                      <div className='border-b w-full mb-2 border-zinc-300'></div>
                      <div className='bg-purple-200 py-1 px-2 rounded-md'>{formatDate(m.createdAt)}</div>
                      <div className='border-b w-full mb-2 border-zinc-300'></div>
                    </div>
                  )}
                  <RenderMessage message={m} index={index} />
                </React.Fragment>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      )}
  
      <ChatInputBar />
    </div>
  );
  
};


export default ChatBox;