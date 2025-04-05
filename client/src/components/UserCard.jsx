import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  
  // Truncate bio to ensure consistent card heights
  const truncateBio = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div
      onClick={() => navigate(`/user/${user.username}`)}
      className="flex flex-col w-full overflow-hidden  rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
    >
      {/* Avatar Section */}
      <div className="relative w-full pb-[75%]">
        <div className="absolute inset-0">
          <Avatar 
            width="100%" 
            height="100%" 
            username={user.username} 
            avatar_url={user.avatar} 
            rounded={false} 
          />
        </div>
        
        {/* Status indicator */}
        {/* {user.accountStatus === "active" && (
          <div className="absolute bottom-2 left-2 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        )} */}
      </div>
      
      {/* User Info Section */}
      <div className="flex flex-col p-4">
        {/* Name and verification */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 max-w-[80%]">
            <h2 className="font-semibold text-base truncate dark:text-white">{user.fullName}</h2>
            {user.isVerified && (
              <span className="text-blue-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          
          <span className="text-xs text-gray-500 dark:text-gray-400">{user.role}</span>
        </div>
        
        {/* Username */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">@{user.username}</p>
        
        {/* Bio with truncation */}
        {user.bio && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {truncateBio(user.bio)}
          </p>
        )}
        
        {/* Footer info */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
          {user.country && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
              </svg>
              {user.country}
            </div>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short"
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;