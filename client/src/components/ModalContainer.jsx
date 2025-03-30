import React, { useEffect } from 'react'

const ModalContainer = ({children}) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // document.body.style.marginRight = '17px';  
        
        return () => {
          document.body.style.overflow = 'auto';
          document.body.style.marginRight = '0 ';
        };
      }, []);
  return (
    <div  className='absolute backdrop-blur-[2px] w-full z-[25] top-0 h-full min-h-[100vh] flex justify-center overflow-y-auto animate-faded'>
        <div className='bg-black absolute w-full h-full cursor-zoom-out  opacity-70'></div>
        <div className='bg-white absolute z-20 mt-[4.2rem] p-5 border animate-popping shadow-lg overflow-hidden rounded-xl  w-[60rem] max-w-4xl'>
            {children}
        </div>
    </div>
  )
}

export default ModalContainer