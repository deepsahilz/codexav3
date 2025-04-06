import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ProjectGrid from "./ProjectGrid";
import UserGrid from "./usergrid";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "projects"; // Default: projects

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === "projects") {
          const { data } = await axiosInstance.get(`/api/search/project?query=${query}`);
          setProjects(data);
        } else {
          const { data } = await axiosInstance.get(`/api/search/user?query=${query}`);
          console.log(data);
          setUsers(data);
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, type]); // Only refetch when query or type changes

  return (
    <div className="px-7 py-10 bg-zinc-100 font-neue">
      
      {/* static buttons */}
      <div className="flex border-b border-zinc-300 mb-10 gap-7 font-semibold">
        <button
          onClick={() => setSearchParams({ query, type: "projects" })}
          className={`${type === "projects" ? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
        >
          Projects
        </button>
        <button
          onClick={() => setSearchParams({ query, type: "users" })}
          className={`${type === "users" ? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"}`}
        >
          Users
        </button>
      </div>

      {/* Conditionally Render Loading & Data */}
      <div className="w-full min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center mt-10">
        <div className="w-8 h-8 border-4  border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : type === "projects" ? (

        projects.length > 0 ? <ProjectGrid projects={projects} /> : <div>No projects found</div>
      ) : (
        users.length > 0 ? <UserGrid users={users} /> : <div>No users found</div>
      )}
    </div>
    </div>
  );
};

export default SearchPage;
