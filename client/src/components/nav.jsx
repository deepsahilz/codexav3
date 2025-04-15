import React, {useEffect,useState } from "react";
import { NavLink,  useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUserContext } from "../context/UserContextProvider.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import NavModal from "./NavModal";
import AddProject from "./AddProject";
import Avatar from "./Avatar";

import searchIcon from "../assets/images/searchIcon.svg";
import logout_icon from "../assets/images/logout_icon.svg";
import edit_icon from "../assets/images/edit_icon.svg";
import SearchBar from "./SearchBar.jsx";
import NavLink1 from "./NavLink1.jsx";
import CodexaLogo from "../assets/images/Logo-1.png"
import { io } from "socket.io-client";
import Notifications from "./Notifications"
import { useSocket } from "../context/SocketContext.jsx";




const Nav = () => {

  
  const navigate = useNavigate();
  const{notifications,setNotifications} = useSocket();
  const { user,setIsLoggedIn,isLoggedIn,setUser } = useUserContext();
  const {register,setValue,handleSubmit,watch,formState: { errors, isSubmitting },} = useForm();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  

  //USE-EFFECT TO MARK READ ALL MESSAGES WHEN OPEN
  useEffect(() => {
    const markAllAsRead = async () => {
      const hasUnread = notifications.some(n => !n.isRead);
      if (!hasUnread) return;
  
      try {
        await axiosInstance.post("/api/user/notifications/mark-read");
        //problem is here
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error("Failed to mark notifications read", err);
      }
    };
  
    if (showNotifs) {
      markAllAsRead();
    }
  }, [showNotifs]);
  
  

  const chatMessages = [
    {
      username: "gwen stacy",
      dp: "../src/assets/images/dp7.png",
      message: "why aren't you picking phone",
      timez: "2m",
    },
    {
      username: "peter2099",
      dp: "../src/assets/images/dp3.png",
      message: "you can't hide from me",
      timez: "2m",
    },
    {
      username: "pavitra prabhakar",
      dp: "../src/assets/images/dp4.png",
      message: "want some chai tea",
      timez: "2m",
    },
    {
      username: "vulture",
      dp: "../src/assets/images/dp5.png",
      message: "i'll kill you peter",
      timez: "2m",
    },
    {
      username: "miles",
      dp: "../src/assets/images/dp6.png",
      message: "remember the spider society",
      timez: "2m",
    },
    {
      username: "gwen_v21",
      dp: "../src/assets/images/dp7.png",
      message: "i want to meet you rn",
      timez: "2m",
    },
    {
      username: "gwen_again",
      dp: "../src/assets/images/dp1.jpg",
      message: "let's have dinner at eiffel?",
      timez: "2m",
    },
  ];

  //HANDLE LOGOUT
  const handleLogout = async () => {
    const response = await axiosInstance.post("/api/auth/logout",{
      showToast:true,
      toastMessage:"successfully logged out"})

    setIsLoggedIn(false);
    setUser("");
    setShowOptions(false);
    navigate("/");
  };

  return (
    <div className="top-0 left-0 sticky z-[50] w-full font-nb">
      <div className="text-white px-7 bg-black w-full   ">

        <div className="hidden lg:flex justify-between items-center h-[3.6rem]">
          <div className="flex gap-10 items-end  h-full">

            <div className="logo h-full mx-auto flex items-center">
              <a
                href="/explore"
                className="text-2xl  font-semibold flex items-center -mt-[3px] font-nb leading-none "
              >
                {/* <span className="font-['dubtronic_solid'] mr-1.5">D</span> */}
                <img className="w-[21px] h-[21px] mr-1" src={CodexaLogo}/>
                Codexa
              </a>
            </div>

            {/* navlinks till search */}
            <ul className="flex gap-8 transition-colors h-full ">
              {isLoggedIn && (
                <li className="h-full flex items-center">
                  <NavLink
                    to="/explore"
                    className="font-medium 
               block  text-stone-400 hover:text-white "
                  >
                    Explore
                  </NavLink>
                  {/* <NavLink1 label={item.label} to={item.to} /> */}
                </li>
              )}

              {isLoggedIn && (
                <li className="h-full flex items-center">
                  <NavLink
                    to="/bounties"
                    className="font-medium 
               text-stone-400 hover:text-white"
                  >
                    Bounties
                  </NavLink>
                </li>
              )}

              {/* {isLoggedIn && (
                <li className="h-full flex items-center">
                  <NavLink
                    to="/#"
                    className="font-medium 
               text-stone-400 hover:text-white"
                  >
                    Communities
                  </NavLink>
                </li>
              )} */}

              {!isLoggedIn && (
                <li className="h-full flex items-center">
                  <a
                    className="font-medium text-stone-400 hover:text-white  "
                    href="#"
                  >
                    About
                  </a>
                </li>
              )}

              {!isLoggedIn && (
                <li className="h-full flex items-center">
                  <a
                    className="font-medium text-stone-400 hover:text-white  "
                    href="#"
                  >
                    Help
                  </a>
                </li>
              )}

              {isLoggedIn &&
              
              <li className="h-full flex items-center">
                <div className="">
                  <SearchBar/>
                </div>
              </li>}
            </ul>
          </div>

          {isLoggedIn && (
            <ul className="flex gap-1 items-center h-full ">
              {/* share project li */}
              <li className="h-full flex items-center pr-2">
                <button
                  onClick={() => {
                    setShowAddProjectModal(true);
                  }}
                  className="hidden transition-colors xl:block rounded-full border-[2px] font-medium border-stone-500 text-stone-300 px-4 py-[4px] text-[15px] hover:bg-zinc-800 hover:border-stone-400 hover:text-stone-300"
                >
                  Share project
                </button>
              </li>

              {/* messages li */}
              <li className="relative h-full flex items-center">
                <div className=" cursor-pointer px-2 py-[16px]"
                  onClick={() => {navigate(`/chat`)}}
                  onMouseEnter={() => {setShowInbox(true);}}
                  onMouseLeave={() => {setShowInbox(false);}}>
                    <svg
                      height="800px"
                      width="800px"
                      viewBox="0 0 512 512"
                      className="fill-zinc-300 w-[18px] h-[18px] hover:fill-white transition-colors "
                    >
                      <g>
                        <polygon points="512,295.199 445.92,226.559 512,169.6" />
                        <polygon points="66.16,226.559 0,295.279 0,169.6" />
                        <path
                          d="M512,357.6v63.199c0,15.281-12.4,27.682-27.68,27.682H27.68c-15.281,0-27.68-12.4-27.68-27.682V357.6
                        l98.959-102.721L212,352.238c11.76,10.082,27.359,15.682,44,15.682c16.641,0,32.32-5.6,44.08-15.682l112.959-97.359L512,357.6z"
                        />
                        <path
                          d="M512,91.119v27.68l-241.442,208c-7.76,6.72-21.359,6.72-29.119,0L0,118.799v-27.68
                        c0-15.279,12.398-27.6,27.68-27.6H484.32C499.6,63.519,512,75.84,512,91.119z"
                        />
                      </g>
                    </svg>
                  {showInbox&&<NavModal  className="w-[20rem] -right-[77px] ">
                  <div className="text-zinc-700  w-full ">
                    <h1 className="font-semibold py-[5px] text-center mb-1">Your messages</h1>
                    <div className="max-h-[20rem] overflow-y-auto w-full">
                    {chatMessages.map((item, i) => (
                          <div key={i} className="py-2 border-t w-full flex justify-between items-start hover:bg-zinc-200 transition-colors px-4" >
                            <div className="flex gap-3 items-center">
                              <div className="w-[2.2rem] h-[2.2rem] overflow-hidden rounded-full">
                                <img className="w-full h-full object-cover"
                                  src={item.dp}
                                  alt={item.username}
                                />
                              </div>
                              <div className="flex flex-col leading-none gap-1">
                                <h1 className="text-stone-800 font-bold  ">
                                  {item.username}
                                </h1>
                                <p className="text-stone-700 text-sm max-w-[10rem] truncate">
                                  {item.message}
                                </p>
                              </div>
                            </div>
                            <div className="text-gray-600 text-[11px]">
                              {item.timez} ago
                            </div>
                          </div>
                        ))}
                    </div>

                  </div>
                  </NavModal>}
                </div>
              </li>

              {/* Notification Bell */}
              <li className="relative h-full flex items-center">
                <div className="cursor-pointer px-1 py-[13px]"
                  onMouseEnter={() => {setShowNotifs(true);}}
                  onMouseLeave={() => {setShowNotifs(false);}}>
                  <div className="relative">
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-zinc-300 w-[25px] h-[25px] hover:fill-white transition-colors duration-300"
                    >
                      <path d="M10.1 5.37363C10.3629 4.57586 11.1142 4 12 4C12.8858 4 13.6371 4.57586 13.9 5.37363C15.7191 6.12152 17 7.91118 17 10V14L19.1464 16.1464C19.4614 16.4614 19.2383 17 18.7928 17H5.20706C4.76161 17 4.53852 16.4614 4.8535 16.1464L7 14V10C7 7.91118 8.28088 6.12152 10.1 5.37363Z" />
                      <path d="M10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18H10Z" />
                    </svg>
                    {notifications.filter(n => !n.isRead).length>0&&
                    <div className="bg-red-500 w-4 h-4 rounded-full absolute -top-[6px] -right-[5px] text-[10px] flex justify-center items-center font-semibold">
                      {notifications.filter(n => !n.isRead).length}
                    </div>}
                  </div>
                  {showNotifs&&<NavModal className="w-[20rem] -right-[77px] ">
                  
                  {/* <div className="text-zinc-700 mt-1">
                    <h1 className="font-semibold">Your Notifications</h1>
                    <div className="p-4"></div>
                  </div> */}
                  <Notifications/>

                  </NavModal>}

                </div>
              </li>

              {/* profile li */}
              <li
                className="text-stone-400 relative pl-3  h-full flex items-center "
                onMouseEnter={() => {setShowOptions(true);}}
                onMouseLeave={() => {setShowOptions(false);}}>
                <button 
                // onClick={() => {setShowOptions(!showOptions);}}
                >
                  <div className="flex items-center hover:bg-zinc-800 border border-transparent hover:border-zinc-700 gap-2 font-medium rounded-full ">
                    <div className="rounded-full  h-[32px] w-[32px] ">  
                      {user&&<Avatar username={user.username} avatar_url={user.avatar} className="text-[14px]"/>
                      }
                    </div>

                    <div className="max-w-[5rem] pr-2">
                      <h2 className="truncate">{user&&user.username}</h2>
                    </div>
                  </div>
                </button>

                {showOptions && (
                  <NavModal className="-right-0 w-[9rem]">
                    <div className="  text-stone-800  flex flex-col   mt-[10px]">
                      <button
                        className=" w-full py-[10px] hover:bg-stone-200 flex items-center px-3 justify-center whitespace-nowrap   capitalize "
                        onClick={() => {
                          navigate(`/user/${user.username}`);
                          setShowOptions(false);
                        }}
                      >
                        <div className="flex gap-3 w-full items-center mx-auto  ">
                          <img className="w-5 h-5" src={edit_icon} />
                          View profile
                        </div>
                      </button>

                      <button
                        className=" w-full py-[10px] hover:bg-stone-200 border-t px-3 flex items-center justify-center whitespace-nowrap  capitalize "
                        onClick={() => {
                          navigate(`user/${user.username}/edit`);
                          setShowOptions(false);
                        }}
                      >
                        <div className="flex gap-3 items-center w-full ">
                          <img className="w-5 h-5" src={edit_icon} />
                          Edit profile
                        </div>
                      </button>

                      <button
                        className=" hover:bg-stone-200 flex gap-3 border-t px-3 items-center capitalize py-[10px] text-left"
                        onClick={handleLogout}
                      >
                        <div className="flex gap-3 items-center  w-full ">
                          <img className="w-5 h-5" src={logout_icon} />
                          logout
                        </div>
                      </button>
                    </div>

                    {/* <div className='absolute -top-[9.5px] right-12 bg-white diamond w-[20px] h-[20px] '></div> */}
                  </NavModal>
                  // </div>
                )}
              </li>

            </ul>
          )}


          {!isLoggedIn && (
            <div className="flex gap-5 items-center">
              <NavLink
                to="/login"
                className="px-3 py-1  border-stone-500 transition-colors hover:bg-stone-800 hover:border-stone-400 h-full bg-black rounded-[7px]"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="px-3 py-1 bg-bloopy rounded-md "
              >
                Get started
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center">
          <h2 className="leading-none font-bold text-[1.2rem]">Codexa</h2>

          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {showAddProjectModal && (
        <AddProject onClose={() => setShowAddProjectModal(false)}></AddProject>
      )}
    </div>
  );
};

export default Nav;
