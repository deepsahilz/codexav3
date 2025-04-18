import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import { useChatContext } from '../context/ChatContext';
import { useUserContext } from '../context/UserContextProvider';

const ChatList = () => {

    const {activeChat,setActiveChat,chats,setChats,setShowChatModal} = useChatContext();

    const dummyChats = [
        {
          _id: 1,
          isTemp: true,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-15T08:00:00.000Z",
          updatedAt: "2025-04-15T09:03:17.115Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1213,
                fullName: "manya",
                username: "manya1213",
                avatar: "../src/assets/images/dp5.png"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId:"67eb0271566282aa1eebf4f6",
            content: "kaise ae dost",
            chatId: 1,
            isRead: true,
            createdAt: "2025-04-15T09:03:17.115Z",
          },
        },
        {
          _id: 2,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-15T08:10:00.000Z",
          updatedAt: "2025-04-15T09:10:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1213,
                fullName: "kirti",
                username: "kirti1213",
                avatar: "../src/assets/images/dp4.png"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId:"67eb0271566282aa1eebf4f6",
            content: "ki karan dea",
            chatId: 2,
            isRead: false,
            createdAt: "2025-04-15T09:03:17.115Z",
          },
        },
        {
          _id: 3,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-16T10:00:00.000Z",
          updatedAt: "2025-04-16T10:25:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1214,
                fullName: "ayesha",
                username: "ayesha1214",
                avatar: "../src/assets/images/dp2.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1214,
            content: "meet me at 5",
            chatId: 3,
            isRead: false,
            createdAt: "2025-04-16T10:25:00.000Z",
          },
        },
        {
          _id: 4,
          isGroupChat: true,
          groupName: "Project Team",
          groupAvatar: "../src/assets/images/group1.jpg",
          createdAt: "2025-04-15T11:00:00.000Z",
          updatedAt: "2025-04-15T12:00:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1213,
                fullName: "manya",
                username: "manya1213",
                avatar: "../src/assets/images/dp5.png"
              },
              role: "member"
            },
            {
              user: {
                _id: 1215,
                fullName: "rahul",
                username: "rahul1215",
                avatar: "../src/assets/images/dp3.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1215,
            content: "code push kar diya",
            chatId: 4,
            isRead: true,
            createdAt: "2025-04-15T12:00:00.000Z",
          },
        },
        {
          _id: 5,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-17T08:00:00.000Z",
          updatedAt: "2025-04-17T08:30:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1216,
                fullName: "sana",
                username: "sana1216",
                avatar: "../src/assets/images/dp6.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1216,
            content: "ready for the test?",
            chatId: 5,
            isRead: false,
            createdAt: "2025-04-17T08:30:00.000Z",
          },
        },
        {
          _id: 6,
          isGroupChat: true,
          groupName: "Dev Squad",
          groupAvatar: "../src/assets/images/group2.jpg",
          createdAt: "2025-04-18T10:00:00.000Z",
          updatedAt: "2025-04-18T11:15:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1215,
                fullName: "rahul",
                username: "rahul1215",
                avatar: "../src/assets/images/dp3.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1217,
                fullName: "neha",
                username: "neha1217",
                avatar: "../src/assets/images/dp7.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1217,
            content: "meeting at 3",
            chatId: 6,
            isRead: true,
            createdAt: "2025-04-18T11:15:00.000Z",
          },
        },
        {
          _id: 7,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-19T09:00:00.000Z",
          updatedAt: "2025-04-19T09:45:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1218,
                fullName: "yash",
                username: "yash1218",
                avatar: "../src/assets/images/dp8.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId:"67eb0271566282aa1eebf4f6",
            content: "sent the notes",
            chatId: 7,
            isRead: true,
            createdAt: "2025-04-19T09:45:00.000Z",
          },
        },
        {
          _id: 8,
          isGroupChat: true,
          groupName: "Fun Group",
          groupAvatar: "../src/assets/images/group3.jpg",
          createdAt: "2025-04-19T12:00:00.000Z",
          updatedAt: "2025-04-19T12:30:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1219,
                fullName: "dev",
                username: "dev1219",
                avatar: "../src/assets/images/dp9.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1220,
                fullName: "ria",
                username: "ria1220",
                avatar: "../src/assets/images/dp10.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1220,
            content: "party kab hai?",
            chatId: 8,
            isRead: false,
            createdAt: "2025-04-19T12:30:00.000Z",
          },
        },
        {
          _id: 9,
          isGroupChat: false,
          groupName: "",
          groupAvatar: "",
          createdAt: "2025-04-20T08:00:00.000Z",
          updatedAt: "2025-04-20T08:15:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1221,
                fullName: "tina",
                username: "tina1221",
                avatar: "../src/assets/images/dp11.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1221,
            content: "see you soon!",
            chatId: 9,
            isRead: false,
            createdAt: "2025-04-20T08:15:00.000Z",
          },
        },
        {
          _id: 10,
          isGroupChat: true,
          groupName: "Study Group",
          groupAvatar: "../src/assets/images/group4.jpg",
          createdAt: "2025-04-21T14:00:00.000Z",
          updatedAt: "2025-04-21T14:30:00.000Z",
          members: [
            {
              user: {
                _id:"67eb0271566282aa1eebf4f6",
                fullName: "karan",
                username: "karan1212",
                avatar: "../src/assets/images/dp1.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1214,
                fullName: "ayesha",
                username: "ayesha1214",
                avatar: "../src/assets/images/dp2.jpg"
              },
              role: "member"
            },
            {
              user: {
                _id: 1216,
                fullName: "sana",
                username: "sana1216",
                avatar: "../src/assets/images/dp6.jpg"
              },
              role: "member"
            },
          ],
          lastMessage: {
            senderId: 1214,
            content: "assignment done?",
            chatId: 10,
            isRead: true,
            createdAt: "2025-04-21T14:30:00.000Z",
          },
        },
      ];
      
      
      

    const tabs = [
        { id: 'all', label: 'all' },
        { id: 'chats', label: 'chats' },
        { id: 'groups', label: 'groups' }
      ];

    const {user} = useUserContext();
    const currentUserId=1212;  // Replace with context later
    
    const [activeTab, setActiveTab] = useState('all');
    const [query, setQuery] = useState('');
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchChats = async()=>{
          // const res = await axiosInstance.get("/api/chat/:chatId/messages");
          // console.log(res.data);
          // setMessages(res.data);
          setChats(dummyChats);
          setIsLoading(false);
        }
        fetchChats();
      },[user])
  
  
    const filteredChats = chats.filter(chat => {
        if (chat.isGroupChat) {
          return chat.groupName.toLowerCase().includes(query.toLowerCase());
        } else {
            console.log("point---",chat)
            const otherUser = chat.members.find(m => m.user._id !== user.id);
            console.log("pointbreak-->",otherUser)
            console.log(otherUser.user)
            return otherUser;
            // return otherUser?.user.fullName.toLowerCase().includes(query.toLowerCase());
        }
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
                {filteredChats.map((chat) => {
                    console.log("moree:",chat);
                const otherUser = chat.members.find(m => m.user._id !== user.id); // Assuming you have 
                // currentUserId
                console.log("bali-->",otherUser);
                return (
                    <div
                    key={chat.id}
                    className={`py-3 pl-7 pr-5 border-b flex items-center cursor-pointer transition-all hover:bg-gray-50 ${
                        activeChat&&activeChat.id === chat.id ? "bg-purple-50" : ""
                    }`}
                    onClick={() => {setActiveChat(chat);console.log(chat);}}
                    >
                    <div className="relative mr-3">
                        <Avatar  username={otherUser.user.username} width="42px" height="42px"/>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-sm">{otherUser.user.fullName}</h3>
                        <span className="text-xs text-gray-500">
                            {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            })}
                        </span>
                        </div>
                        <div className='flex justify-between items-end'>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage.content}</p>
                        {!chat.lastMessage.isRead && (
                            <div className="ml-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">1</span>
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