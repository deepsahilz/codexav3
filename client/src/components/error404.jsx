import React from 'react';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-rejouice">
      <div className="text-center">
        <img className='mx-auto w-10 h-10 mb-10' src='../src/assets/images/emoji1.png'></img>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Oops, page not found</h1>
        <p className="text-gray-600 mb-6 text-[15px] max-w-[27rem]">
          We are very sorry for the inconvenience. It looks like you're trying to access a page that has been deleted or never even existed.
        </p>
        <Link to="/" className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 shadow-xl  shadow-blue-500 rounded-lg  hover:bg-blue-500">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
