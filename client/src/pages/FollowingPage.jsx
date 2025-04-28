import { useEffect, useState } from 'react'
// import Suggestions from './suggestions'
import ProjectGrid from '../components/ProjectGrid'
import axiosInstance from '../utils/axiosInstance.js'

const ExplorePage = () => {

  const[feedData,setFeedData] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
      const fetchFollowingFeed = async()=>{
        setLoading(true);
          try{
          const response = await axiosInstance.get("/api/project/followed")
          // console.log(response.data);
          setFeedData(response.data)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchFollowingFeed();
    
  },[])

  return (
    <div className='bg-zinc-100'>
      {/* <Suggestions/> */}
      {/* {feedData.length>0&& */}
      
      <div className='mx-7 pt-10  pb-28'><ProjectGrid isLoading={loading} projects = {feedData} /></div>
      {/* } */}
    </div> 
  )
}

export default ExplorePage