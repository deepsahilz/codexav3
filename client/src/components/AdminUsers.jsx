import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyUsers = [
    {
      _id: '0cwjcblao98842g4u2buve121',
      username: 'john_doe',
      email: 'john@example.com',
      joinDate: '2024-07-01',
      status: 'active',
    },
    {
      _id: '2nc29846174120zbybndqw9x',
      username: 'jane_admin',
      email: 'jane@example.com',
      joinDate: '2024-06-15',
      status: 'banned',
    },
  ];

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axiosInstance.get('/admin/users');
  //       setUsers(res.data.users);
  //     } catch (err) {
  //       console.error('Error fetching users:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setUsers(dummyUsers);
      setLoading(false);
    }, 500);
  }, []);

  const handleBanToggle = async (userId, currentStatus) => {
    const action = currentStatus === 'banned' ? 'unban' : 'ban';

    // try {
    //   const res = await axiosInstance.put(`/admin/users/${action}/${userId}`);
    //   setUsers(prev =>
    //     prev.map(user =>
    //       user._id === userId ? { ...user, status: action === 'ban' ? 'banned' : 'active' } : user
    //     )
    //   );
    // } catch (err) {
    //   console.error(`Failed to ${action} user:`, err);
    // }

    setUsers(prev =>
      prev.map(user =>
        user._id === userId
          ? { ...user, status: currentStatus === 'banned' ? 'active' : 'banned' }
          : user
      )
    );
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      <div className="flex flex-col gap-4">
        {users.map((user,index) => (
          <div
            key={user._id}
            className="flex flex-row items-center justify-between border-b   bg-white"
          >

            <div className="flex gap-2 items-end">
            <div>{index+1}</div>
              {/* <div className="font-medium">{user._id}</div> */}
              <div className="font-medium">{user.username}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>

            <div className="text-sm text-gray-500">{user.joinDate}</div>

            <div className={`font-semibold ${user.status === 'banned' ? 'text-red-500' : 'text-green-600'}`}>
              {user.status}
            </div>

            <button
              onClick={() => handleBanToggle(user._id, user.status)}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {user.status === 'banned' ? 'Unban' : 'Ban'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
