import React, { useState } from 'react';

const suggest_list = [
    { text: "javascript" },
    { text: "python" },
    { text: "machine learning" },
    { text: "web development" },
    { text: "react js" },
    { text: "hotel management system" },
    { text: "google api" },
    { text: "automation" },
    { text: "bootstrap website" },
    { text: "c++" },
];

const Suggestions = () => {
  const [slidePosition, setSlidePosition] = useState(0); // Track the current position of the list
  const maxItems = suggest_list.length; // The total number of items

  // Function to handle slide forward
  const slideForward = () => {
    // Only slide forward if there's more to slide
    if (slidePosition < maxItems - 8) {
      setSlidePosition(prevPosition => prevPosition + 1);
    }
  };

  // Function to handle slide backward
  const slideBackward = () => {
    // Only slide backward if it's not at the start
    if (slidePosition > 0) {
      setSlidePosition(prevPosition => prevPosition - 1);
    }
  };

  // Check if forward or backward buttons should be hidden
  const isAtStart = slidePosition === 0;
  const isAtEnd = slidePosition === maxItems -8;

  
  return (
    <div className="w-full py-7 px-7 hide-scrollbar overflow-hidden relative">
      <div className="flex transition-transform gap-3" 
           style={{
             transform: `translateX(-${(slidePosition * (100 / maxItems))}%)`, 
             transition: 'transform 0.3s ease'
           }}>
        {suggest_list.map((item, i) => (
          <a href="#" key={i}>
            <div className="border-[1.5px] text-[1rem] cursor-pointer whitespace-nowrap bg-stone-200 border-stone-300 text-stone-400 px-5 py-[10px] transition-colors rounded-md hover:bg-stone-300 hover:text-stone-500 capitalize">
              {item.text}
            </div>
          </a>
        ))}
      </div>

      {/* Forward Button (Visible only when not at the end) */}
      {!isAtEnd && (
        <div 
          className="absolute px-[13px] h-10 w-10 rounded-full bg-black bg-opacity-25 hover:bg-opacity-40 transition-opacity top-[26%] right-9 cursor-pointer" 
          onClick={slideForward}
        >
          <h1 className="text-[25px] text-white">{'>'}</h1>
        </div>
      )}

      {/* Backward Button (Visible only when not at the start) */}
      {!isAtStart && (
        <div 
          className="absolute px-[13px] h-10 w-10 rounded-full bg-opacity-25 bg-black top-[26%] left-9 cursor-pointer" 
          onClick={slideBackward}
        >
          <h1 className="text-[25px] text-white">{'<'}</h1>
        </div>
      )}
    </div>
  );
}

export default Suggestions;
