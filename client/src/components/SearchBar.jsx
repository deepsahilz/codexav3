import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance.js";
import searchIcon from "../assets/images/searchIcon.svg";
import recentIcon from "../assets/images/recent.svg";
import trendingIcon from "../assets/images/trending.svg";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider.jsx";

// import svj from "" yes i can see you you

const SearchBar = () => {

  const {user} = useUserContext();

  const { register, setValue, watch, handleSubmit } = useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const searchRef = useRef(null);
  const isNavigating = useRef(false);
  const searchTerm = watch("search");
  const navigate = useNavigate();



  // const dummyData = ["hello", "javacom", "bye logy"];
  const recentSearches = [
    "java",
    "Library management system",
    "Ai attendance system",
  ];



  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      return; // Skip fetching if navigating
    }
  
    const fetchSuggestions = async () => {
      if (!searchTerm) return;
  
      try {
        const { data } = await axiosInstance.get(`/api/suggest/project?query=${searchTerm}`);
        // console.log(data);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
  
    fetchSearchHistory(); // Runs immediately
    const debounce = setTimeout(fetchSuggestions, 300);
  
    return () => clearTimeout(debounce);
  }, [searchTerm]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="text-blue-500 font-semibold">{part}</span>
        ) : (
            part
        )
    );
};


//MAIN SEARCH FUNCTION
const handleSearch=(query)=>{
  navigate(`/search?query=${query}`);
  // setSearchHistory(prev => [query, ...prev]);
  addSearchHistory(query);
  setShowSearchModal(false);
  setValue("search", "");
  document.activeElement.blur();
  
}

//SEARCH-HISTORY-FUNCTIONS
const fetchSearchHistory = async () => {
  try {
      const response = await axiosInstance.get(`api/user/search-history`);
      // console.log(response.data);
      setSearchHistory(response.data.searchHistory || []);
  } catch (error) {
      console.error("Failed to fetch search history", error);
  }
};
const addSearchHistory = async (searchTerm) => {
  try {
      await axiosInstance.post(`api/user/search-history`, { searchTerm });
      setSearchHistory(prev => [searchTerm, ...prev]);
      // fetchSearchHistory();
  } catch (error) {
      console.error("Failed to add search history", error);
  }
};
const handleRemoveSearch = async (searchTerm) => {
  try {
    // console.log("to delete: ",searchTerm)
      await axiosInstance.delete(`api/user/search-history`, { data: { searchTerm } });
      fetchSearchHistory(); 
  } catch (error) {
      console.error("Failed to remove search item", error);
  }
};

  
const renderModalContent = () => {
  return searchTerm ? (
    <div className="">   
      {suggestions.length > 0 ? (
        <>
          <h4 className="text-[13px] font-medium ml-5 text-zinc-500 uppercase">
            Projects
          </h4>
          <ul>
            {suggestions.map((suggestion, i) => (
              <li
                key={i}
                className={`${i === selectedIndex ? "bg-blue-100" : "hover:bg-blue-100"} text-lg font-bold py-1 px-5 flex items-center text-zinc-700 cursor-pointer transition-all`}
                onClick={() => handleSearch(suggestion)}
              >
                <img className="w-4 h-4 opacity-50 mr-2" src={searchIcon} />
                {highlightText(suggestion, searchTerm)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h4 className="text-[13px] ml-5 font-medium text-zinc-500 uppercase">
            Recents
          </h4>
          <ul>
            {searchHistory.map((item, i) => (
              <li
                key={i}
                className="hover:bg-zinc-200 text-lg font-bold py-1 px-5 flex justify-between items-center text-zinc-700 cursor-pointer transition-all"
                >
                <div 
                onClick={() => handleSearch(item)}
                className="flex  items-center capitalize">
                  <img className="w-6 h-6 opacity-50 mr-2 " src={recentIcon} />
                  {item}
                </div>
                <span onClick={() => handleRemoveSearch(item)} className="cursor-pointer text-xl font-medium text-zinc-400">
                  &times;
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  ) : (
    <div className="">
      <h4 className="text-[13px] ml-5 font-medium text-zinc-500 uppercase">
            Recents
          </h4>
          <ul>
            {searchHistory.map((item, i) => (
              <li
                key={i}
                className="hover:bg-zinc-200 text-lg font-bold py-1 px-5 flex justify-between items-center text-zinc-700 cursor-pointer transition-all"
                >
                <div 
                onClick={() => handleSearch(item)}
                className="flex items-center capitalize">
                  <img className="w-6 h-6 opacity-50 mr-2 " src={recentIcon} />
                  {item}
                </div>
                <span onClick={() => handleRemoveSearch(item)} className="cursor-pointer text-xl font-medium text-zinc-400">
                  &times;
                </span>
              </li>
            ))}
      </ul>
      <div className="mb-3 mt-7 px-5 flex gap-2">
        <img className="w-5 h-5 opacity-50" src={trendingIcon} />
        <h4 className="text-[13px] font-medium text-zinc-500 uppercase">
          Trending Searches
        </h4>
      </div>
      <ul className="flex flex-wrap gap-2 px-5">
        {recentSearches.map((recent, i) => (
          <li
            key={i}
            className="px-2 py-1 text-sm hover:bg-zinc-200 text-zinc-600 border-zinc-300 cursor-pointer rounded-lg border"
          >
            {recent}
          </li>
        ))}
      </ul>
    </div>
  );
};
  

  return (
    <div className="w-[24rem]">
    <form 
    onSubmit={handleSubmit}
    ref={searchRef}
    className="relative flex items-center bg-zinc-800 backdrop-blur-md shadow-lg rounded-full 
    border border-zinc-600 w-full">

      <img className="absolute ml-3 w-4 h-4 invert opacity-80" src={searchIcon} alt="Search"/>
      <input placeholder="Search..."
        autoComplete="off"
        {...register("search", { maxLength: 20 })}
        onFocus={() => {setShowSearchModal(true);}}
        className=" rounded-full w-full pl-10 px-4 py-2 bg-transparent text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
        onKeyDown={(e) => {
          if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) e.preventDefault();
      
          if (e.key === "ArrowDown" && suggestions.length > 0) {
              setSelectedIndex((prev) => {
                  const newIndex = (prev + 1) % suggestions.length;
                  setValue("search", suggestions[newIndex]);
                  return newIndex;
              });
              isNavigating.current = true;
          }
      
          if (e.key === "ArrowUp" && suggestions.length > 0) {
              setSelectedIndex((prev) => {
                  const newIndex = (prev - 1 + suggestions.length) % suggestions.length;
                  setValue("search", suggestions[newIndex]);
                  return newIndex;
              });
              isNavigating.current = true;
          }
      
          if (e.key === "Enter") {
              // const searchValue = suggestions[selectedIndex] || searchTerm;
              const searchValue = searchTerm;
              setValue("search", searchValue);
              handleSearch(searchValue);
          }
      }}
      
      />
     


      {showSearchModal && <div className="absolute text-zinc-800 top-12 left-0 right-0 mt-1 py-5 bg-white border border-zinc-300 rounded-lg shadow-xl max-h-50 overflow-hidden z-10">
        {renderModalContent()}
      </div>}

    </form>
    </div>
  );
};

export default SearchBar;
