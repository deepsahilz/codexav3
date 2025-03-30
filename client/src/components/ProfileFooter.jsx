import React from 'react'
import { useUserContext } from './context/UserContextProvider'

const ProfileFooter = () => {
    const {user}  = useUserContext();
  return (
    <div className="bg-black  px-10 overflow-hidden pb-[10rem] w-full  mt-10 flex justify-between items-center">
        <h1 className="text-white text-[5rem] font-bold uppercase font-rejouice mt-5">
          {user.username}
        </h1>
        <h1 className="text-white">socials</h1>
      </div>
  )
}

export default ProfileFooter