import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  
  const truncateBio = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div
      onClick={() => navigate(`/user/${user.username}`)}
      className="flex flex-col w-full rounded-xl overflow-hidden border bg-white dark:bg-gray-900 hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Avatar */}
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
      </div>

      {/* Info */}
      <div className="flex flex-col p-4 gap-2">
        {/* Name */}
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold truncate dark:text-white">{user.fullName}</h2>
          <span className="text-xs text-gray-400">{user.role}</span>
        </div>

        {/* Username */}
        <p className="text-sm text-gray-500">@{user.username}</p>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {truncateBio(user.bio)}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-2 mt-2">
          {user.country && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
              </svg>
              {user.country}
            </div>
          )}
          <div>
            {new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
