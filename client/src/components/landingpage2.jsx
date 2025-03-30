import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from './context/UserContextProvider';

const LandingPage = () => {
  const { isLoggedIn,loading } = useUserContext();

  if(loading) return null
  return isLoggedIn?<Navigate to="/explore" />:
  (
    <div className='bg-stone-200 gap-5 font-rejouice flex-col text-stone-800 flex justify-center items-center  p-20 h-[100vh] w-full'>
      <div className='flex gap-5 text-5xl items-center leading-none'>
        <div className='bg-bloopy h-10 w-10 diamond'></div>
        <h2 className='font-medium'>Landing page</h2>
      </div>
      <h2 className='text-xl'>Soon to be built</h2>
    </div>
  );
};

export default LandingPage;
