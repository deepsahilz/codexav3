import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const [stats, setStats] = useState({});
  
    useEffect(() => {
      const fetchStats = async () => {
        const res = await axiosInstance.get('/api/admin/stats');
        setStats(res.data);
      };
      fetchStats();
    }, []);
  
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('api/admin/users');
        setUsers(res.data); // Set the users data
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBanToggle = async (userId, currentStatus) => {
    const action = currentStatus === 'banned' ? 'unban' : 'ban';

    try {
      await axiosInstance.put(`/api/admin/user/${userId}/${action}`);
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, accountStatus: action === 'ban' ? 'banned' : 'active' }
            : user
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
    }
  };


  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId)); // Remove the deleted user from the state
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <>
    <div className="p-6 bg-zinc-200 font-neue">
      <h2 className="text-2xl font-semibold mb-4">User Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="text-xl font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers ?? '-'}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="text-xl font-medium text-gray-700">Online Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.onlineUsers ?? '-'}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="text-xl font-medium text-gray-700">Banned Users</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.bannedUsers ?? '-'}</p>
        </div>
      </div>
    </div>
    <div className="p-8 min-h-screen font-neue bg-zinc-200">
    <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
  
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl p-6 border border-zinc-300">
      <table className="min-w-full text-sm text-zinc-700">
        <thead>
          <tr className="bg-zinc-100 text-left text-zinc-600 uppercase text-xs tracking-widest border-b-2 border-zinc-300">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="hover:bg-zinc-100 transition-all duration-300 border-b border-zinc-300"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-zinc-800">{user.username}</td>
              <td className="px-6 py-4 text-zinc-500">{user.email}</td>
              <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
              <td className={`px-6 py-4 font-bold ${user.accountStatus === 'banned' ? 'text-red-500' : 'text-emerald-600'}`}>
                {user.accountStatus}
              </td>
              <td className="px-6 py-4 flex gap-3">
                {user.role !== 'admin' && (
                  <>
                    <button
                      onClick={() => handleBanToggle(user._id, user.accountStatus)}
                      className="px-5 py-2 rounded-md text-xs font-bold bg-zinc-800 text-white hover:bg-zinc-900 transition-colors"
                    >
                      {user.accountStatus === 'banned' ? 'Unban' : 'Ban'}
                    </button>
                    {/* <button
                      onClick={() => handleDelete(user._id)}
                      className="px-5 py-2 rounded-md text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button> */}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </>



  );
};

export default AdminUsers;
