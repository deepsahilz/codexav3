import React from 'react'
import UserCard from './UserCard'

const UserGrid = ({users,className,columns}) => {
  return (
    <div className={`grid  md:grid-cols-2  2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns==2?"lg:grid-cols-2 auto-rows-[25rem]":"lg:grid-cols-4 auto-rows-[24rem]"}` }>
        {users.map((user,i)=>(
            <UserCard user={user} key={i}/>
        ))}
        
    </div>
  )
}

export default UserGrid