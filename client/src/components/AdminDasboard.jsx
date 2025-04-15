import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const AdminDasboard = () => {
    const [stats,setStats]= useState();

    useEffect(()=>{
        const fetchstats = ()=>{
            const res = axiosInstance.get("/api/admin/stats");
            console.log(res.data);
            setStats(res.data);
        }
    },[])
  return (
    <div>
        current stats:
        online users count
        total users count
        banned users count
        suspended users count

        optional:
        online users graph
        date /online users graph
    </div>
  )
}

export default AdminDasboard