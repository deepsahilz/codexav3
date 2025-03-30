import React, { useEffect, useState } from 'react'
import Suggestions from './suggestions'
import axios from 'axios'
import ProjectGrid from './projectgrid'
import axiosInstance from '../utils/axiosInstance.js'

const ExplorePage = () => {

  const[feedData,setFeedData] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
      const fetchHomeFeed = async()=>{
        setLoading(true);
          try{
          const response = await axiosInstance.get("/api/project")
          console.log(response.data);
          setFeedData(response.data)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchHomeFeed();
    
  },[])

  if (loading) return <div className="flex items-center  h-[100vh] justify-center gap-2 text-stone-600">
  <span className="animate-spin w-7 h-7  border-2 border-blue-500 border-t-transparent rounded-full"></span>
  <span className="text-[14px] font-semibold uppercase">Loading...</span>
</div>

  return (
    <div className='bg-stone-50'>
      <Suggestions/>
      {feedData.length>0&&<div className='mx-7 '><ProjectGrid projects = {feedData} /></div>}
    </div> 
  )
}

export default ExplorePage