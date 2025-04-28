import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    // Show confirmation alert
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
  
    if (!confirmDelete) return; // If user cancels, stop further execution
  
    try {
      await axiosInstance.delete(`/api/admin/project/${projectId}`);
      setProjects(prev => prev.filter(project => project._id !== projectId));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };
  

  if (loading) return <div className="p-6">Loading projects...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Projects</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{project.title}</td>
                <td className="px-4 py-2">{project.AuthorId?.username}</td>
                <td className="px-4 py-2">{project.type}</td>
                <td className="px-4 py-2">{new Date(project.createdAt).toLocaleString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: 'numeric', minute: '2-digit',
                })}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProjects;
