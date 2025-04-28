import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ProjectGrid from "./ProjectGrid";
import UserGrid from "./usergrid";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "projects";

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({ projects: 0, users: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    // Fetch counts immediately
    const fetchCounts = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/search/counts?query=${query}`);
        setCounts({ projects: data.projectsCount, users: data.usersCount });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [query]);

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
          setUsers(data);
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, type]);

  return (
    <div className="px-7 py-10 bg-zinc-100 font-neue">
      {/* Showing query text */}
      <h2 className="text-xl mb-7 font-semibold text-zinc-700">
        Showing results for "<span className="text-blue-600">{query}</span>"
      </h2>

      {/* Tab buttons */}
      <div className="flex border-b border-zinc-300 mb-10 gap-7 font-semibold relative">
  <button
    onClick={() => setSearchParams({ query, type: "projects" })}
    className={`${type === "projects" ? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"} flex  items-center relative`}
  >
    Projects
    {counts.projects !== undefined && (
      <span className="ml-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full mb-2">
        {counts.projects}
      </span>
    )}
  </button>
  <button
    onClick={() => setSearchParams({ query, type: "users" })}
    className={`${type === "users" ? "border-b-2 text-zinc-800 border-blue-600" : "text-zinc-600"} flex items-center relative`}
  >
    Users
    {counts.users !== undefined && (
      <span className="ml-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full mb-2">
        {counts.users}
      </span>
    )}
  </button>
</div>


      {/* Content */}
      <div className="w-full min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : type === "projects" ? (
          projects.length > 0 ? (
            <ProjectGrid projects={projects} />
          ) : (
            <div>No projects found for "{query}"</div>
          )
        ) : (
          users.length > 0 ? (
            <UserGrid users={users} />
          ) : (
            <div>No users found for "{query}"</div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
