import React from 'react';
import { Link } from 'react-router-dom';
const HelpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-neue">
      <div className="text-center flex flex-col justify-center items-center">
        <img className='mx-auto w-10 h-10 mb-10' src='../src/assets/images/emoji1.png'></img>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">First help us !</h1>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Help us by funding the app</h1>
        <p className="text-gray-600 mb-6 text-center text-[15px] max-w-[27rem]">
          We need funding to make this app accessible worldwide to all the students,professionals and tech enthusiasts</p>
        <Link to="/" className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 shadow-xl  shadow-blue-500 rounded-lg  hover:bg-blue-500">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default HelpPage;
