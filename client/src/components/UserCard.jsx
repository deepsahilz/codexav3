import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";


const UserCard = ({ user }) => {
    const navigate = useNavigate();
  return (
    <div 
    onClick={()=>navigate(`/user/${user.username}`)} 
    className=" items-center gap-5 overflow-hidden border rounded-2xl shadow-md backdrop-blur-md bg-white/20 hover:shadow-lg transition duration-200">
      
      {/* Avatar */}
      <div className="w-full h-[40%]">
        <Avatar username={user.username} avatar_url={user.avatar} rounded={false} />
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{user.fullName}</h2>
          {user.isVerified && (
            <span className="text-blue-500 text-sm font-bold">✔</span>
          )}
        </div>
        <p className="text-sm text-gray-600">@{user.username}</p>
        {user.bio && <p className="text-sm text-gray-700 mt-1">{user.bio}</p>}
        {user.country && <p className="text-xs text-gray-500">{user.country}</p>}
      </div>
    </div>
  );
};

export default UserCard;
