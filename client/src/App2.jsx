import React from "react";
import axiosInstance from "./utils/axiosInstance.js";

const App = () => {
    const handleSignup = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/signup", {
                fullName: "John Doe",
                email: "one@gmail.com",
                username: "one",
                password: "1234",
            });
            console.log("Signup Successful:", response.data.message);
        }  catch (error) {
            if(error.response){
                console.log(error.response.data.message);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email: "one@gmail.com",
                password: "1234",
            });
            console.log("Login Successful:", response.data.message);
        }  catch (error) {
            if(error.response){
                console.log(error.response.data.message);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleGetUserData = async () => {
        try {
            const response = await axiosInstance.get("/api/user/67af82da916a96b228ac5d50");
            console.log("User data:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleUpdateUserData = async () => {
        try {
            const response = await axiosInstance.post("/api/user/67b072d2906291d4fc950f17",{
                fullName: "one"
            });
            console.log("Updated data:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleFollow = async () => {
        try {
            const response = await axiosInstance.post("/api/user/67af82da916a96b228ac5d50/follow");
            console.log("response:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleUnFollow = async () => {
        try {
            const response = await axiosInstance.post("/api/user/67af82da916a96b228ac5d50/unfollow");
            console.log("response:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleGetFollowers = async () => {
        try {
            const response = await axiosInstance.get("/api/user/67af82da916a96b228ac5d50/followers");
            console.log("response:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    const handleGetFollowing = async () => {
        try {
            const response = await axiosInstance.get("/api/user/67b072d2906291d4fc950f17/following");
            console.log("response:", response.data);
        }  catch (error) {
            if(error.response.data.message){
                console.log(error.response.data.message)
            }
            else if(error.response){
                console.log(error.response.data);
            }else{
                console.log(error)
            }
            
        }
    };
    

  handleGetFollowing();
//   67b072d2906291d4fc950f17 one (logged-in)
//   67af82da916a96b228ac5d50 john doe

  return <div>hello</div>;
};

export default App;
