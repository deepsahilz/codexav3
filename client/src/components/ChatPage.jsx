import React, { useState, useRef, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import Avatar from './Avatar';
// Assuming there's a ChatContext
// import { ChatContext } from '../context/ChatContext';


const tabs = [
  { id: 'ALL', label: 'ALL' },
  { id: 'GROUPS', label: 'GROUPS' },
  { id: 'PUBLIC', label: 'PUBLIC' }
];

const dummyusers = [
  {
    id: 1, 
    name: 'Kirit Yadav', 
    avatar: '../src/assets/images/dp1.jpg', 
    lastSeen: 'Last seen a hour ago',
    isActive: true,
    isTyping: false,
    messages: [
      { id: 1, text: "Hey there! How are you?", sender: "them", time: "10:23 AM" },
      { id: 2, text: "I really like your idea, but I just think we can do more in this", sender: "you", time: "10:25 AM" },
      { id: 3, text: "I will share something", sender: "you", time: "10:25 AM" },
      { id: 5, text: "Let's together work on this an create something more awesome.", sender: "them", time: "10:27 AM" },
      { id: 6, text: "Sounds perfect!", sender: "them", time: "10:28 AM" },
      { id: 7, text: "Sounds perfect!", sender: "them", time: "10:29 AM" },
      { id: 8, text: "Sounds perfect!", sender: "them", time: "10:36 AM"}
    ]
  },
  { 
    id: 2, 
    name: 'Ankit Mishra', 
    avatar: '../src/assets/images/dp3.png', 
    lastSeen: 'Are we meeting today? Let me know',
    isActive: false,
    isTyping: false,
    unread: 1,
    messages: [
      { id: 1, text: "Are we meeting today? Let me know", sender: "them", time: "9:45 AM" }
    ]
  },
  { 
    id: 3, 
    name: 'Akanksha Sinha', 
    avatar: '../src/assets/images/dp4.png', 
    lastSeen: 'Did I missed you this time around',
    isActive: false,
    isTyping: false,
    unread: 1,
    messages: [
      { id: 1, text: "Did I missed you this time around", sender: "them", time: "9:23 AM" }
    ]
  },
  { 
    id: 4, 
    name: 'Harshit Nagar', 
    avatar: '../src/assets/images/dp5.png', 
    lastSeen: 'Last night party was awesome..',
    isActive: false,
    isTyping: false,
    messages: [
      { id: 1, text: "Last night party was awesome..", sender: "them", time: "8:45 AM" }
    ]
  },
  { 
    id: 5, 
    name: 'Ashish Singh', 
    avatar: '../src/assets/images/dp6.png', 
    lastSeen: 'Bro, I need your help. Call me.',
    isActive: false,
    isTyping: false,
    messages: [
      { id: 1, text: "Bro, I need your help. Call me.", sender: "them", time: "8:12 AM" }
    ]
  },
  { 
    id: 6, 
    name: 'Ashish Singh', 
    avatar: '../src/assets/images/dp7.png', 
    lastSeen: 'Bro, I need your help. Call me.',
    isActive: false,
    isTyping: false,
    messages: [
      { id: 1, text: "Bro, I need your help. Call me.", sender: "them", time: "8:12 AM" }
    ]
  },
  { 
    id: 7, 
    name: 'Ashish Singh', 
    avatar: '../src/assets/images/dp3.png', 
    lastSeen: 'Bro, I need your help. Call me.',
    isActive: false,
    isTyping: false,
    messages: [
      { id: 1, text: "Bro, I need your help. Call me.", sender: "them", time: "8:12 AM" }
    ]
  }
];

const ChatPage = () => {
  
  // const { activeChat, setActiveChat } = useContext(ChatContext);  
  const [activeChat, setActiveChat] = useState(null); // Replace with context when available
  
  const messagesEndRef = useRef(null);
  const [pendingChat, setPendingChat] = useState(null); 
  const [users, setUsers] = useState(dummyusers);
  const [activeTab, setActiveTab] = useState('ALL');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);


  const activeUser = users.find(user => user.id === activeChat);

  // Filter users based on search term and active tab
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, activeUser?.messages]);

  // Handle chat selection
  const handleChatSelect = (userId) => {
    // If there's a pending chat and user didn't send a message, discard it
    setPendingChat(null);
    setActiveChat(userId);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // If we have a pending chat, this message will create the actual chat
    if (pendingChat) {
      // In a real app, this would create a chat in the backend
      const pendingUser = pendingChat;
      
      if (pendingUser) {
        const newUser = {
          id: users.length + 1,
          name: pendingUser.fullName,
          avatar: pendingUser.avatar || '../src/assets/images/default.png',
          lastSeen: 'Just now',
          isActive: false,
          isTyping: false,
          messages: [{
            id: 1, 
            text: newMessage, 
            sender: "you", 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]
        };
        
        setUsers([newUser,...users ]);
        setActiveChat(newUser.id);
        setPendingChat(null);
        setNewMessage('');
        return;
      }
    }
    
    // Normal message sending for existing chats
    const updatedUsers = users.map(user => {
      if (user.id === activeChat) {
        const newMessageObj = {
          id: user.messages.length + 1,
          text: newMessage,
          sender: 'you',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...user,
          messages: [...user.messages, newMessageObj]
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setNewMessage('');
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  //fetch search suggestions
  const fetchSuggestions = async (value) => {
    if (!value) return setSuggestions([]);
    try {
        setSuggestionLoading(true);
        const response = await axiosInstance.get(`/api/utils/searchUser?query=${value}`);
        setSuggestions(response.data); 
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    } finally {
        setSuggestionLoading(false);
    }
};

  // Highlight matching text in search results
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} className="text-blue-500">{part}</span> : part
    );
  };

  // Handle user selection from search
  const handleUserSelect = (user) => {
    const existingChat = users.find(u => u.id === user._id);
    
    if (existingChat) {
      setActiveChat(existingChat.id);
    } else {
      setPendingChat(user);
      setActiveChat(null);
      
      setQuery('');
      setSuggestions([]);
    }
  };

 
  const getCurrentChatUI = () => {

    if (pendingChat) {
      // const pendingUser = suggestions.find(s => s._id === pendingChat);
      const pendingUser = pendingChat;
      return (
        <div className="flex-1 flex flex-col">
          {/* Chat header for new chat */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Avatar username={pendingUser?.username} avatar_url={pendingUser?.avatar} />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm">{pendingUser?.fullName}</h3>
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
          
          {/* Empty message area for new chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Send a message to start the conversation</p>
            </div>
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <div className="p-7 border-t bg-white">
            <div className="flex items-center bg-gray-100 rounded-full px-4">
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
        </div>
      );
    }

    if (activeChat) {
      return (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                <img src={activeUser?.avatar} alt={activeUser?.name} className="w-8 h-8 rounded-full object-cover" />
                {activeUser?.isActive && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-sm">{activeUser?.name}</h3>
                <p className="text-xs text-gray-500">
                  {activeUser?.isTyping ? "Typing..." : activeUser?.lastSeen}
                </p>
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
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
            {activeUser?.messages.map((message,i) => (
              <div 
                key={i} 
                className={`flex mb-4 ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-[1.5rem] px-4 py-2 ${
                    message.sender === 'you' 
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
                    message.sender === 'you' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <div className="p-7 border-t bg-white">
            <div className="flex items-center bg-gray-100 rounded-full px-4">
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
        </div>
      );
    }
    
    return (
      <div className='flex w-full justify-center items-center text-zinc-500 font-semibold'>
        Select a chat to start messaging
      </div>
    );
  };

  return (
    <div className="w-full h-[90vh] overflow-hidden mx-auto bg-white flex font-nb">
      {/* Left sidebar */}
      <div className="w-[23rem] min-w-[23rem] h-full bg-white border-r flex flex-col">
        {/* Chats section */}
        <div className="flex-1 flex flex-col h-full">
        
          <div className="pl-7 pt-3 border-b">
            <h2 className="font-bold text-gray-800">Chats</h2>
            <div className="flex mt-2 space-x-4 border-b items-center">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  className={`pb-2 px-1 text-xs font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-purple-500 text-purple-500' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <button className="ml-auto mb-2 text-purple-600 bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="pl-7 pr-5 py-2 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 w-full py-2 pl-8 pr-4 rounded-full focus:outline-none text-sm"
                value={query}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery(value);
                  fetchSuggestions(value);
                  setSelectedIndex(0);
                }}
                // onKeyDown={(e) => {
                //   if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) e.preventDefault();
                //   if (e.key === "Enter" && suggestions[selectedIndex]) handleUserSelect(suggestions[selectedIndex]);
                //   if (e.key === "ArrowDown") setSelectedIndex((prev) => (prev + 1) % suggestions.length);
                //   if (e.key === "ArrowUp") setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                // }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              {/* Search suggestions */}
              {suggestionLoading ? (
                <div className="absolute top-full h-[50px] flex items-center justify-center w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md text-center text-gray-500">
                  <span className="animate-spin h-6 w-6 py-2 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="absolute top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${
                        index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleUserSelect(suggestion)}
                    >
                      <div className="w-9 h-9 rounded-full object-cover overflow-hidden">
                        <Avatar username={suggestion.username} avatar_url={suggestion.avatar} />
                      </div>
                      <div className="flex font-semibold text-sm flex-col">
                        <h2 className="capitalize">{highlightText(suggestion.fullName, query)}</h2>
                        <h2 className="text-zinc-500">@{highlightText(suggestion.username, query)}</h2>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                query && (
                  <div className="absolute top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md p-3 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* Chat list */}
          {users.length > 0 ? (
            <div className="flex-1 overflow-y-auto max-h-full">
              {filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className={`py-3 pl-7 pr-5 border-b flex items-center cursor-pointer transition-all hover:bg-gray-50 ${
                    activeChat === user.id ? 'bg-purple-50' : ''
                  }`}
                  onClick={() => handleChatSelect(user.id)}
                >
                  <div className="relative mr-3">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    {user.isActive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-sm">{user.name}</h3>
                      <span className="text-xs text-gray-500">
                        {user.messages[user.messages.length - 1]?.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {user.isTyping ? (
                        <span className="text-purple-600 font-medium">Typing...</span>
                      ) : (
                        user.lastSeen
                      )}
                    </p>
                  </div>
                  {user.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{user.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center mt-10 text-zinc-500 font-semibold'>no chats to show</div>
          )}
        </div>
      </div>
      
      {/* Main chat area - dynamic based on state */}
      {getCurrentChatUI()}
    </div>
  );
};

// Animation keyframes
const fadeInRightKeyframes = `
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const fadeInLeftKeyframes = `
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Add animation classes to Tailwind
const animationClasses = `
  .animate-fade-in-right {
    animation-name: fadeInRight;
  }
  .animate-fade-in-left {
    animation-name: fadeInLeft;
  }
`;

// Add styles to document
const style = document.createElement('style');
style.textContent = `${fadeInRightKeyframes} ${fadeInLeftKeyframes} ${animationClasses}`;
document.head.appendChild(style);

export default ChatPage;