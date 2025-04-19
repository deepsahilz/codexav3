import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { useChatContext } from '../context/ChatContext';
import Avatar from './Avatar';
import { useUserContext } from '../context/UserContextProvider';

const UserSearch = ({onUserClick}) => {


    const [selectedIndex, setSelectedIndex] = useState(0);
    const {chats,activeChat, setActiveChat,setShowChatModal} = useChatContext();
    const [query, setQuery] = useState('');
    const {user} = useUserContext();
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
  
   

  
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
    const handleSelectChat = (selectedUser) => {
        console.log(selectedUser);
        const existingChat = chats.find(chat =>
          chat.members.some(m => m.user.id == selectedUser._id)
        );
      
        if (existingChat) {
          console.log("chat already exists");
          setActiveChat(existingChat);
        } else {
          const newChat = {
            isTemp: true,
            isGroup: false,
            members: [
              { 
                user:{
                    _id:user.id,
                    username: user.username, 
                    fullName: user.fullName, 
                    avatar: user.avatar
                }, 
                role: "member",
              },
              { 
                user:{
                    _id:selectedUser._id,
                    username: selectedUser.username, 
                    fullName: selectedUser.fullName, 
                    avatar: selectedUser.avatar
                }, 
                role: "member",
              }
            ]
          };
      
          console.log("here--->",newChat);
          setActiveChat(newChat);
          setQuery('');
          setShowChatModal(false);
          setSuggestions([]);
        }
      };
      
      
      

  return (
    <div className="w-[25rem]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-zinc-200 w-full py-3 pl-8 pr-4 rounded-lg focus:outline-none text-sm"
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
                <div className=" top-full h-[50px] flex items-center justify-center w-full left-0  bg-white border mt-1 rounded-lg shadow-md text-center text-gray-500">
                  <span className="animate-spin h-6 w-6 py-2 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className=" top-full w-full left-0  bg-white border mt-1 max-h-[15rem] overflow-y-auto rounded-lg shadow-md">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${
                        index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSelectChat(suggestion)}
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
                  <div className=" top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md p-3 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                )
              )}
            </div>
          </div>
  )
}

export default UserSearch