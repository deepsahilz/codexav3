const OpenProjectSkeleton = () => {
    return (
      <div className="w-full px-7 pt-8 pb-40 bg-zinc-100 rounded-xl animate-pulse">
        {/* Title & buttons */}
        <div className="flex justify-between items-center">
          <div className="h-10 w-full bg-gray-300 rounded"></div>
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
  
        {/* Created by */}
        <div className="flex items-center gap-20 mt-5">
          <div className="h-6 w-56 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          
        </div>
  
        {/* Tabs */}
        <div className="flex gap-7 mt-6">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
  
        {/* Section content */}
        <div className="mt-10 space-y-4">
          <div className="h-5 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default OpenProjectSkeleton;
  