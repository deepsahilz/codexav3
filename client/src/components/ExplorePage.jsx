import React, { useEffect, useState } from 'react'
import Suggestions from './suggestions'
import axios from 'axios'
import ProjectGrid from './ProjectGrid'
import axiosInstance from '../utils/axiosInstance.js'
import ProjectSkeletonCard from './ProjectSkeletonCard.jsx'

const ExplorePage = () => {

  const[feedData,setFeedData] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
      const fetchHomeFeed = async()=>{
        setLoading(true);
          try{
          const response = await axiosInstance.get("/api/project")
          // console.log(response.data);
          setFeedData(response.data)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchHomeFeed();
    
  },[])

  return (
    <div className='bg-zinc-100'>
      <Suggestions/>
      {/* {feedData.length>0&& */}
      <div className='mx-7  pb-28'><ProjectGrid isLoading={loading} projects = {feedData} /></div>
      {/* } */}
    </div> 
  )
}

export default ExplorePage