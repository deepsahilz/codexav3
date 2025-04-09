import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-zinc-900 text-white font-neue px-7 py-3 shadow-md flex justify-between items-center">
      <div className="text-xl font-semibold">Codexa Admin</div>
      <div className="flex gap-6 text-sm">
        <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
        <Link to="/admin/projects" className="hover:text-gray-300">Projects</Link>
        <Link to="/admin/reports" className="hover:text-gray-300">Reports</Link>
        <Link to="/admin/logout" className="hover:text-red-400">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
