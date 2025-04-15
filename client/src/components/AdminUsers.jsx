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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-2 text-sm">{formatDate(user.createdAt)}</td>
                <td className={`px-4 py-2 font-semibold ${user.accountStatus === 'banned' ? 'text-red-500' : 'text-green-600'}`}>
                  {user.accountStatus}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Show Ban/Unban and Delete only if the user is not an admin */}
                  {user.role !== 'admin' && (
                    <>
                      <button
                        onClick={() => handleBanToggle(user._id, user.accountStatus)}
                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {user.accountStatus === 'banned' ? 'Unban' : 'Ban'}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
