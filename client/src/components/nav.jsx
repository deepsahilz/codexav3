import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import NavModal from "./NavModal";
import AddProject from "./AddProject";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import InboxPreview from "./InboxPreview.jsx";
import Notifications from "./Notifications";

// Import assets
import searchIcon from "../assets/images/searchIcon.svg";
import logout_icon from "../assets/images/logout_icon.svg";
import edit_icon from "../assets/images/edit_icon.svg";
import CodexaLogo from "../assets/images/Logo-1.png";

const Nav = () => {
  const navigate = useNavigate();
  const { notifications, setNotifications } = useSocket();
  const { user, setIsLoggedIn, isLoggedIn, setUser } = useUserContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  // Check scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mark all notifications as read when notifications modal is opened
  useEffect(() => {
    const markAllAsRead = async () => {
      const hasUnread = notifications.some(n => !n.isRead);
      if (!hasUnread) return;
  
      try {
        await axiosInstance.post("/api/user/notifications/mark-read");
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error("Failed to mark notifications read", err);
      }
    };
  
    if (showNotifs) {
      markAllAsRead();
    }
  }, [showNotifs]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSearchActive(false);
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {
        showToast: true,
        toastMessage: "Successfully logged out"
      });
      setIsLoggedIn(false);
      setUser("");
      setShowOptions(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={`top-0 left-0 sticky z-[50] w-full font-nb transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Main navbar container */}
      <div className={`text-white px-4 sm:px-6 lg:px-7 bg-black w-full transition-all duration-300 ${isScrolled ? 'py-1' : ''}`}>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center h-[3.8rem]">
          {/* Left side - Logo and navigation */}
          <div className="flex gap-6 xl:gap-10 items-end h-full">
            {/* Logo */}
            <div className="logo h-full flex items-center">
              <a href="/explore" className="text-2xl font-semibold flex items-center -mt-[3px] font-nb leading-none">
                <img className="w-[21px] h-[21px] mr-1" src={CodexaLogo} alt="Codexa Logo" />
                {user?.role === "admin" ? "Codexa Admin" : "Codexa"}
              </a>
            </div>

            {/* Navigation links */}
            <ul className="flex gap-5 xl:gap-8 transition-colors h-full">
              {isLoggedIn && (
                <li className="h-full flex items-center">
                  <NavLink 
                    to="/explore" 
                    className={({ isActive }) => 
                      `font-medium block transition-colors ${isActive ? 'text-white' : 'text-stone-400 hover:text-white'}`
                    }
                  >
                    Explore
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="h-full flex items-center">
                  <NavLink 
                    to="/following" 
                    className={({ isActive }) => 
                      `font-medium block transition-colors ${isActive ? 'text-white' : 'text-stone-400 hover:text-white'}`
                    }
                  >
                    Following
                  </NavLink>
                </li>
              )}

              {isLoggedIn && user?.role === "admin" && (
                <>
                  {/* <li className="h-full flex items-center">
                    <NavLink 
                      to="/admin/stats" 
                      className={({ isActive }) => 
                        `font-medium block transition-colors ${isActive ? 'text-white' : 'text-stone-400 hover:text-white'}`
                      }
                    >
                      Stats
                    </NavLink>
                  </li> */}
                  <li className="h-full flex items-center">
                    <NavLink 
                      to="/admin/users" 
                      className={({ isActive }) => 
                        `font-medium block transition-colors ${isActive ? 'text-white' : 'text-stone-400 hover:text-white'}`
                      }
                    >
                      Users
                    </NavLink>
                  </li>
                  <li className="h-full flex items-center">
                    <NavLink 
                      to="/admin/projects" 
                      className={({ isActive }) => 
                        `font-medium block transition-colors ${isActive ? 'text-white' : 'text-stone-400 hover:text-white'}`
                      }
                    >
                      Projects
                    </NavLink>
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <li className="h-full flex items-center">
                    <Link className="font-medium text-stone-400 hover:text-white transition-colors" to="/about">About</Link>
                  </li>
                  <li className="h-full flex items-center">
                    <Link className="font-medium text-stone-400 hover:text-white transition-colors" to="/help">Help</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li className="h-full flex items-center">
                  <SearchBar />
                </li>
              )}
            </ul>
          </div>

          {/* Right side - User controls */}
          {isLoggedIn ? (
            <ul className="flex gap-1 items-center h-full">
              {/* Share Project Button */}
              <li className="h-full flex items-center pr-2">
                <button 
                  onClick={() => setShowAddProjectModal(true)}
                  className="hidden transition-colors xl:block rounded-full border-[2px] font-medium border-stone-500 text-stone-300 px-4 py-[4px] text-[15px] hover:bg-zinc-800 hover:border-stone-400 hover:text-stone-300"
                >
                  Share project
                </button>
              </li>

              {/* Inbox */}
              <li className="relative h-full flex items-center">
                <div 
                  className="cursor-pointer px-2 py-[16px]"
                  onClick={() => navigate(`/inbox`)}
                  onMouseEnter={() => setShowInbox(true)}
                  onMouseLeave={() => setShowInbox(false)}
                >
                  <svg
                    height="800px"
                    width="800px"
                    viewBox="0 0 512 512"
                    className="fill-zinc-300 w-[18px] h-[18px] hover:fill-white transition-colors"
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

                  {showInbox && (
                    <NavModal className="w-[20rem] -right-[77px]">
                      <InboxPreview />
                    </NavModal>
                  )}
                </div>
              </li>

              {/* Notifications */}
              <li className="relative h-full flex items-center">
                <div 
                  className="cursor-pointer px-1 py-[13px]"
                  onMouseEnter={() => setShowNotifs(true)}
                  onMouseLeave={() => setShowNotifs(false)}
                >
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
                    {notifications.filter(n => !n.isRead).length > 0 && (
                      <div className="bg-red-500 w-4 h-4 rounded-full absolute -top-[6px] -right-[5px] text-[10px] flex justify-center items-center font-semibold">
                        {notifications.filter(n => !n.isRead).length}
                      </div>
                    )}
                  </div>

                  {showNotifs && (
                    <NavModal className="w-[20rem] -right-[77px]">
                      <Notifications />
                    </NavModal>
                  )}
                </div>
              </li>

              {/* User Profile */}
              <li 
                className="text-stone-400 relative pl-3 h-full flex items-center"
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
              >
                <button onClick={() => navigate(`/user/${user.username}`)}>
                  <div className="flex items-center hover:bg-zinc-800 border border-transparent hover:border-zinc-700 gap-2 font-medium rounded-full p-1">
                    <div className="rounded-full h-[32px] w-[32px]">  
                      {user && <Avatar username={user.username} avatar_url={user.avatar} className="text-[14px]" />}
                    </div>
                    <div className="max-w-[5rem] pr-2">
                      <h2 className="truncate">{user && user.username}</h2>
                    </div>
                  </div>
                </button>

                {showOptions && (
                  <NavModal className="-right-0 w-[9rem]">
                    <div className="text-stone-800 flex flex-col mt-[10px]">
                      <button 
                        className="w-full py-[10px] hover:bg-stone-200 flex items-center px-3 justify-center whitespace-nowrap capitalize"
                        onClick={() => {
                          navigate(`/user/${user.username}`);
                          setShowOptions(false);
                        }}
                      >
                        <div className="flex gap-3 w-full items-center mx-auto">
                          <img className="w-5 h-5" src={edit_icon} alt="Profile" />
                          View profile
                        </div>
                      </button>

                      <button 
                        className="w-full py-[10px] hover:bg-stone-200 border-t px-3 flex items-center justify-center whitespace-nowrap capitalize"
                        onClick={() => {
                          navigate(`user/${user.username}/edit`);
                          setShowOptions(false);
                        }}
                      >
                        <div className="flex gap-3 items-center w-full">
                          <img className="w-5 h-5" src={edit_icon} alt="Edit" />
                          Edit profile
                        </div>
                      </button>

                      <button 
                        className="hover:bg-stone-200 flex gap-3 border-t px-3 items-center capitalize py-[10px] text-left"
                        onClick={handleLogout}
                      >
                        <div className="flex gap-3 items-center w-full">
                          <img className="w-5 h-5" src={logout_icon} alt="Logout" />
                          Logout
                        </div>
                      </button>
                    </div>
                  </NavModal>
                )}
              </li>
            </ul>
          ) : (
            <div className="flex gap-5 items-center">
              <NavLink 
                to="/login" 
                className="px-3 py-1 border border-stone-500 transition-colors hover:bg-stone-800 hover:border-stone-400 h-full bg-black rounded-[7px]"
              >
                Log in
              </NavLink>

              <NavLink 
                to="/signup" 
                className="px-3 py-1 bg-bloopy text-white font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Get started
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-between items-center h-16">
          {/* Mobile search active state */}
          {mobileSearchActive ? (
            <div className="w-full flex items-center">
              <div className="flex-1">
                <SearchBar />
              </div>
              <button 
                onClick={() => setMobileSearchActive(false)}
                className="ml-2 p-2"
              >
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
              </button>
            </div>
          ) : (
            <>
              {/* Logo */}
              <div className="flex items-center">
                <a href="/explore" className="text-xl font-semibold flex items-center font-nb leading-none">
                  <img className="w-[21px] h-[21px] mr-1" src={CodexaLogo} alt="Codexa Logo" />
                  {user?.role === "admin" ? "Codexa Admin" : "Codexa"}
                </a>
              </div>

              {/* Mobile controls */}
              <div className="flex items-center gap-3">
                {isLoggedIn && (
                  <>
                    {/* Mobile search button */}
                    <button 
                      onClick={() => setMobileSearchActive(true)}
                      className="p-2"
                      aria-label="Search"
                    >
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Mobile notifications button */}
                    <button 
                      onClick={() => navigate('/notifications')}
                      className="p-2 relative"
                      aria-label="Notifications"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-zinc-300"
                      >
                        <path d="M10.1 5.37363C10.3629 4.57586 11.1142 4 12 4C12.8858 4 13.6371 4.57586 13.9 5.37363C15.7191 6.12152 17 7.91118 17 10V14L19.1464 16.1464C19.4614 16.4614 19.2383 17 18.7928 17H5.20706C4.76161 17 4.53852 16.4614 4.8535 16.1464L7 14V10C7 7.91118 8.28088 6.12152 10.1 5.37363Z" />
                        <path d="M10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18H10Z" />
                      </svg>
                      {notifications.filter(n => !n.isRead).length > 0 && (
                        <div className="bg-red-500 w-3 h-3 rounded-full absolute top-1 right-1"></div>
                      )}
                    </button>
                  </>
                )}
                
                {/* Mobile menu toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2"
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black text-white border-t border-zinc-800 px-4 py-4 animate-slideDown">
          <div className="space-y-4">
            {isLoggedIn && (
              <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                <div className="rounded-full h-[40px] w-[40px]">
                  {user && <Avatar username={user.username} avatar_url={user.avatar} className="text-[16px]" />}
                </div>
                <div>
                  <div className="font-medium">{user && user.username}</div>
                  <button 
                    onClick={() => navigate(`/user/${user.username}`)}
                    className="text-sm text-stone-400"
                  >
                    View profile
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {isLoggedIn && (
                <>
                  <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                      `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                    }
                  >
                    Explore
                  </NavLink>
                  <NavLink
                    to="/following"
                    className={({ isActive }) =>
                      `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                    }
                  >
                    Following
                  </NavLink>
                  <NavLink
                    to="/inbox"
                    className={({ isActive }) =>
                      `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                    }
                  >
                    Messages
                  </NavLink>
                  <button
                    onClick={() => {
                      setShowAddProjectModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-lg font-medium text-stone-400"
                  >
                    Share project
                  </button>
                </>
              )}

              {isLoggedIn && user?.role === "admin" && (
                <>
                  <div className="border-t border-zinc-800 my-3 pt-3">
                    <div className="text-sm text-stone-500 uppercase font-medium mb-2">Admin</div>
                    <NavLink
                      to="/admin/stats"
                      className={({ isActive }) =>
                        `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                      }
                    >
                      Stats
                    </NavLink>
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                      }
                    >
                      Users
                    </NavLink>
                    <NavLink
                      to="/admin/projects"
                      className={({ isActive }) =>
                        `block py-2 text-lg font-medium ${isActive ? 'text-white' : 'text-stone-400'}`
                      }
                    >
                      Projects
                    </NavLink>
                  </div>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <Link to="/about" className="block py-2 text-lg font-medium text-stone-400">About</Link>
                  <Link to="/help" className="block py-2 text-lg font-medium text-stone-400">Help</Link>
                </>
              )}
            </div>

            {isLoggedIn ? (
              <div className="pt-3 border-t border-zinc-800">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-2 text-lg font-medium text-stone-400"
                >
                  <img className="w-5 h-5" src={logout_icon} alt="Logout" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 flex flex-col gap-3">
                <NavLink
                  to="/login"
                  className="w-full py-2 text-center border border-stone-500 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="w-full py-2 text-center bg-bloopy rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get started
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showAddProjectModal && (
        <AddProject onClose={() => setShowAddProjectModal(false)} />
      )}
    </div>
  );
};

export default Nav;