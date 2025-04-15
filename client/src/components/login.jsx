import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import codexaLogo from "../assets/images/Logo-1.png"


import loaderIcon from '../assets/images/loader_icon2.svg'
import googleIcon from '../assets/images/google_icon.svg'
import axiosInstance from '../utils/axiosInstance';
import { useUserContext } from '../context/UserContextProvider';
import Cookies from 'js-cookie';
//write logic, if token already there,then redirect

const login = () => {

  const [isSubmitting,setIsSubmitting] = useState(false)
  const {register,handleSubmit,formState: { errors }} = useForm()
  const navigate = useNavigate();
  const {setUser,isLoggedIn,setIsLoggedIn} = useUserContext();

  const handleLogin = async (data) => {
    try {
      setIsSubmitting(true);
      //using axiosInstance with interceptors
      const response = await axiosInstance.post("/api/auth/login",data,
      {
        showToast:true,
        toastMessage:"Login successfull"
      });
      console.log("Login Successful:", response.data);
      // setUser(JSON.parse(Cookies.get("user")));
      setIsLoggedIn(true);
      setIsSubmitting(false);
      navigate('/explore');
    } 
    catch (error) {
      setIsSubmitting(false)
      console.log("error: ",error.response);
    }
  };

  return (
    <div className="bg-stone-200 flex items-center w-full h-screen">
    <div className=" bg-white mx-auto flex rounded-lg shadow-lg overflow-hidden w-[50rem] ">
      
      <div className="bg-black w-[45%] p-12 flex flex-col justify-center">
        <div className='h-full w-full'>
                  <h1 className="text-xl flex items-center gap-[6px]  font-rejouice font-semibold tracking-wide text-white">
                    <img className='w-5 h-5 -mt-[5px]' src={codexaLogo}/>
                    Codexa.io</h1>        
                </div>
        {/* <h1 className="text-[2rem] tracking-tight font-['sora'] font-semibold text-white">Codexa</h1>
        <h2 className="text-[1.7rem] tracking-tight font-['sora']  text-stone-200 leading-[2rem] mb-4">Digital platform for developers to showcase their work</h2>
        <p className="text-white opacity-75">For the developers, by the developers</p> */}
    </div>
    
    
    <div className="w-[55%] py-10 relative flex flex-col justify-center items-center px-12">
      
      { isSubmitting && <div className='absolute  w-full h-full flex justify-center items-center '>
          <img className="w-[4rem] h-[4rem]  animate-spin" src={loaderIcon}/>
          <div className='absolute  w-full h-full bg-black opacity-5'/>
        </div>}

        <div className="w-full">
          <div className="mb-8 ">
              <h2 className="text-[1.6rem] font-semibold tracking-tighter   text-gray-800">Welcome back.</h2>
          </div>

          <form action="" onSubmit={handleSubmit(handleLogin)}>
            
              <div className="mb-4">
                  <label className="block text-gray-600 " htmlFor="email">Email</label>
                  <input className="w-full p-[5px] border border-gray-300 rounded" type="email" id="email" 
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

              <div className="mb-4 ">
                <label className="block text-gray-600" htmlFor="password">Password</label>
                <input
                className=" w-full p-[5px] border border-gray-300 rounded" type="password" id="password"
                {...register("password",{ required:{value:3, message:"Required field"}, maxLength: {value:64,message:"Max length is 64"}, minLength:{value:4, message:"Min length is 4"},message:"required field" })}/>

                {errors.password && 
                <div className='text-red-600 text-[14px]'>{errors.password.message}</div>}
            </div>

              <div className="flex items-center justify-end mb-4">
                  {/* <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox"/>
                      <span className="ml-2 text-gray-600">Remember me</span>
                  </label> */}
                  <a href="#" className="text-blue-500 text-sm ">Forgot password?</a>
              </div>

              <p className="text-center">New user?&nbsp; <Link to="/signup" className="text-blue-600" >Create an account</Link></p>

              <button disabled ={isSubmitting}  className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4" type="submit">Log in</button>

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

export default login