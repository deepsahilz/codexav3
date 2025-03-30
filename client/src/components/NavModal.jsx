import React from 'react'

const NavModal = ({className,right,children,...props}) => {
  return (

<div style={{ right: right }}  className={`z-[24] absolute bg-white top-[54px] animate-fadeIn rounded-lg shadow-xl border ${className || ""}`}>
        
            <div className='w-full h-full flex justify-center items-center overflow-hidden rounded-lg'>
                {children}
            </div>
        
        <div className='absolute -top-[9.5px] right-[26%] bg-white z-[25] diamond w-[20px] h-[20px] '></div>
    </div>
    

  )
}

export default NavModal