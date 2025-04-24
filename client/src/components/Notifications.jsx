import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Avatar from "../components/Avatar";
import { timeAgo } from '../utils/utilityFunctions';
import LoadingSpinner from './LoadingSpinner';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/user/notifications");
        console.log(response.data);
        setNotifications(response.data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className='w-full  flex flex-col text-zinc-900'>
      <div className='w-full font-semibold border-b py-2 text-center'>Your notifications</div>
      {loading ? (<LoadingSpinner/>
      ) : notifications.length > 0 ? (
        <div className='flex flex-col h-[17rem] overflow-hidden overflow-y-auto'>
          {notifications.map((n, index) => (
            <div key={index}>
              {n.type === "follow" && (
                <div className='flex gap-2 items-center py-2 border-b px-3'>
                  <Avatar avatar_url={n.senderId.avatar} username={n.senderId.username} width="30px" height="30px" />
                  <div className='flex flex-col items-start w-full'>
                    <span className='text-sm'>
                      <span className='text-blue-600'>{n.senderId?.username}</span> started following you
                    </span>
                    <div className='flex items-center gap-2 '>
                      <span className='text-xs '>{timeAgo(n.createdAt)}</span>
                      {!n.isRead && <div className='w-2 h-2 bg-blue-600 rounded-full'></div>}
                    </div>
                  </div>
                </div>
              )}
              {n.type === "like" && (
                <div className='flex gap-2 items-center py-2 border-b px-3'>
                  <Avatar avatar_url={n.senderId.avatar} username={n.senderId.username} width="30px" height="30px" />
                  <div className='flex flex-col items-start w-full'>
                    <span className='text-sm'>
                      <span className='text-blue-600'>{n.senderId?.username}</span> liked your project
                    </span>
                    <div className='flex items-center gap-2 '>
                      <span className='text-xs '>{timeAgo(n.createdAt)}</span>
                      {!n.isRead && <div className='w-2 h-2 bg-blue-600 rounded-full'></div>}
                    </div>
                  </div>
                  <div className='w-8 h-6'>
                    <img className='w-full h-full object-cover' src={`http://localhost:5000/${n.projectThumbnail}`} alt="Project Thumbnail" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='h-[20rem] p-5 flex justify-center items-center'>No notifications to show</div>
      )}
    </div>
  );
};

export default Notifications;
