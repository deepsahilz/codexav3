import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axiosInstance.get('/api/admin/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Stats</h2>
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
  );
};

export default AdminDashboard;
