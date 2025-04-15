import React, { createContext, useState, useContext, useEffect } from 'react';
const UserContext = createContext();
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("rendering user context")

  useEffect(() => {

    const checkAuth = async() => {
      console.log("Sending auth request /api/auth/me");
        try {
            const response = await axios.get("/api/auth/me",{
              baseURL:  import.meta.env.VITE_BASE_URL||"http://localhost:5000",
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
          })

            // console.log("From context",response.data)
            setUser(response.data);
            setIsLoggedIn(true);
        }catch(e){
        // setIsLoggedIn(false);
        // console.log(e);
        }finally{
          setLoading(false)}
        };
        checkAuth();
    }, [isLoggedIn]);


  if(loading) return (null)
  return (

    <UserContext.Provider value={{ user, setUser, isLoggedIn,setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
