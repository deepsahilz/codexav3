import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import googleIcon from '../assets/images/google_icon.svg'
import loaderIcon from '../assets/images/loader_icon2.svg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../utils/axiosInstance'

const signup = () => {

  const {register,handleSubmit,watch,formState: { errors,isSubmitting },} = useForm({mode:onchange})

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", data);
        console.log(response.data); 
        navigate("/login");

    } catch (error) {
      console.log(error);
    }
};


   return (
    <div className="bg-stone-300 w-full h-screen flex  items-center">
    <div className=" bg-white mx-auto flex rounded-xl shadow-lg overflow-hidden  md:w-[55rem]">
      <div className="bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 w-[45%] p-12   hidden md:flex md:flex-col md:justify-center">
        <h1 className="text-[2rem]  font-rejouice font-semibold tracking-wide text-white">Codexa.io</h1>
        <h2 className="text-[1.7rem] tracking-tight font-['sora']  text-stone-200 leading-[2rem] mb-4">Digital platform for developers to showcase their work</h2>
        <p className="text-white opacity-75">For the developers, by the developers</p>
    </div>
        
    <div className="w-full md:w-[55%] relative flex items-center font-neue">
      
      {isSubmitting && <div className='absolute  w-full h-full flex justify-center items-center '>
        <img className="w-[4rem] h-[4rem]  animate-spin" src={loaderIcon}/>
        <div className='absolute  w-full h-full bg-black opacity-5'/>
      </div>}

      <div className="px-12 py-10 flex flex-col justify-center space-y-4 w-full">
        {/* header */}
        <div className="mb-0 ">
            <h2 className="text-[1.6rem] font-semibold  font-neue  text-gray-800">Welcome to Codexa 👋</h2>
        </div>

        <form action="" className='space-y-3 ' onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* name */}
            {/* <div className="flex space-x-4"> */}
            <div className="w-full">
              <label className="block text-gray-600" htmlFor="full-name">Full Name</label>
              <input className="w-full p-[5px] border border-gray-300 rounded" type="text" id="full-name" 
                {...register("fullName",{ required: {value:true,message:"Required field"}, 
                maxLength: {value:24,message:"Max length is 24"} })}/>
                {errors.fullName && <div className='text-[14px] text-red-600'>{errors.fullName.message}</div>}

                {/* <div className="w-1/2">
                    
                    <label className="block text-gray-600" htmlFor="first-name">First Name</label>
                    <input 
                      className="w-full p-[5px] border border-gray-300 rounded" type="text" id="first-name" 
                      {...register("firstName",{ required: {value:true,message:"Required field"}, 
                      maxLength: {value:24,message:"Max length is 24"} })}/>
                      {errors.firstName && <div className='text-[14px] text-red-600'>{errors.firstName.message}</div>}
                
                </div>

                <div className="w-1/2">
                    <label className="block text-gray-600 " htmlFor="last-name">Last Name</label>
                    <input className="w-full p-[5px] border border-gray-300 rounded" type="text" id="last-name"
                     {...register("lastName",{maxLength: {value:24,message:"Max length is 24"} })}/>
                     {errors.lastName && 
                      <div className='text-[14px] text-red-600'>{errors.lastName.message}</div>}
                </div> */}
              </div>

            {/* USERNAME */}
              <div className="">
                <label className="block text-gray-600 " htmlFor="username">username</label>
                <input  className="w-full p-[5px] border border-gray-300 rounded" type="text" id="username"  
                  {...register("username",{
                      required: { value: true, message: "Required field" },
                      maxLength: { value: 24, message: "username is too long" },
                      pattern: { 
                        value:/^[a-zA-Z0-9._]+$/, 
                        message: "username is invalid" 
                      }
                    })}/>

                    {errors.username && <div className='text-[14px] text-red-600'>{errors.username.message}</div>}
            </div>

            {/* email */}
            <div className="">
                <label className="block text-gray-600 " htmlFor="email">Email</label>
                <input  className="w-full p-[5px] border border-gray-300 rounded" type="email" id="email"  
                  {...register("email",{
                      required: { value: true, message: "Required field" },
                      maxLength: { value: 254, message: "E-mail is too long" },
                      minLength: { value: 4, message: "E-mail is too short" },
                      pattern: { 
                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 
                        message: "E-mail is invalid" 
                      }
                    })}/>

                    {errors.email && <div className='text-[14px] text-red-600'>{errors.email.message}</div>}
            </div>

            {/* password */}
            <div className="">
                <label className="block text-gray-600" htmlFor="password">Password</label>
                <input
                className=" w-full p-[5px] border border-gray-300 rounded" type="password" id="password"
                {...register("password",{ required:{value:3, message:"Required field"}, maxLength: {value:64,message:"Max length is 64"}, minLength:{value:4, message:"Min length is 4"},message:"required field" })}/>

                {errors.password && 
                <div className='text-red-600 text-[14px]'>{errors.password.message}</div>}
            </div>

            
            <p className="text-center mt-5 text-stone-800">
              Already have an account?&nbsp; 
              <Link to="/login" className="text-blue-600">Log in</Link></p>

            <button disabled ={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-3 px-4 rounded mb-4" type="submit">Sign Up</button>
            
            <button disabled ={isSubmitting} className="w-full flex items-center hover:border-gray-400 justify-center border border-gray-300 py-2 px-4 rounded">
              <img className='w-5 h-5 mr-2' src={googleIcon}></img> 
              Continue with Google
            </button> 

            
          </form>
          
        </div>
      </div>
    </div>
  </div>

   )
 }
 export default signup
 