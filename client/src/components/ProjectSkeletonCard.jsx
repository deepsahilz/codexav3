import React from 'react';

const ProjectSkeletonCard = () => {
  return (
    <div className='flex flex-col gap-2  w-full animate-pulse'>
      {/* Image Section */}
      <div className='w-full h-[calc(100vh-3.8rem)  ] relative rounded-lg overflow-hidden bg-zinc-200'>
        {/* Overlay */}
        <div className='absolute top-3 pl-4 pr-5 w-full flex justify-between items-center gap-2'>
          <div className='flex gap-2 items-center'>
            <div className="w-7 h-7 rounded-full bg-zinc-300" />
            <div className='flex items-center gap-2'>
              <div className='h-4 w-24 bg-zinc-300 rounded'></div>
              {/* <div className='h-4 w-10 bg-zinc-300 rounded'></div> */}
            </div>
          </div>
          <div className='w-6 h-6 bg-zinc-300 rounded-md'></div>
        </div>

        {/* Bottom bar */}
        {/* <div className='absolute left-4 pr-8 bottom-3 flex justify-between w-full text-white'>
          <div className='flex gap-3'>
            <div className='flex items-center gap-1'>
              <div className='w-[18px] h-[18px] bg-zinc-300 rounded'></div>
              <div className='w-5 h-3 bg-zinc-300 rounded'></div>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-[18px] h-[18px] bg-zinc-300 rounded'></div>
              <div className='w-5 h-3 bg-zinc-300 rounded'></div>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-[18px] h-[18px] bg-zinc-300 rounded'></div>
            <div className='w-5 h-3 bg-zinc-300 rounded'></div>
          </div>
        </div> */}

        {/* Thumbnail */}
        {/* <div className='w-full h-[200px] bg-zinc-300'></div> */}
      </div>

      {/* Details */}
      <div className='ml-1 space-y-2'>
        <div className='h-6 w-3/4 bg-zinc-300 rounded'></div>
        <div className='h-4 w-5/6 bg-zinc-200 rounded'></div>
        <div className='flex flex-wrap gap-2 mt-2'>
          {[1, 2, 3].map(i => (
            <div key={i} className='h-6 w-16 bg-zinc-200 rounded-full'></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeletonCard;
