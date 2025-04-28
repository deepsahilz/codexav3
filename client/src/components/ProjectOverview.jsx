import React from 'react'

const ProjectOverview = ({project}) => {
  return (
    <div>
        <div className='flex flex-col gap-7'>
            <div className='w-full h-[70vh] rounded-lg overflow-hidden mb-2 bg-zinc-600'>
                <img className='w-full h-full object-contain' src={`http://localhost:5000/${project.thumbnail}`}></img>
            </div>
                <div className='mb-5'>
                    <h4 className='font-semibold text-zinc-600 mb-1 text-xl'>Description</h4>
                    <p className='text-zinc-600 font-nb text-2xl'>{project.description}</p>
                </div>

                {/* <div>
                    <h4 className='font-semibold text-zinc-600 mb-1'>Core Features</h4>
                    <ul className="list-disc pl-5 text-zinc-600">
                        <li>Utilizes ChatGPT's API to generate Ghibli-style artwork.</li>
                        <li>Implements text-to-image model integration for AI-driven visuals.</li>
                        <li>Supports fine-tuned prompt engineering for style accuracy.</li>
                        <li>Optimized rendering pipeline for high-resolution outputs.</li>
                        <li>Built with React and TailwindCSS for a responsive UI.</li>
                    </ul>

                </div> */}

                <div className='flex mb-5'>
                    <h4 className='font-semibold text-zinc-600 mb-1 text-xl'>Project Type</h4>
                    <p className='text-zinc-600 ml-10 bg-purple-200 px-3 flex items-center rounded-lg'>Web app</p>
                </div>

                

                <div className='flex gap-10 mb-5'>
                    <h4 className='font-semibold text-zinc-600 mb-1 text-xl'>Technologies & Tools</h4> 
                    <div className='flex gap-2'>
                        {project.tags?.map((tag,index)=>(
                            <div key={index} className='flex  items-center px-3 border rounded-lg bg-zinc-300'>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>


                {/* <div className='thumbnail'>
                    <h3 className='font-semibold text-zinc-600 mb-1'>Thumbnail</h3>
                    <img className=' h-[20rem]' src={`http://localhost:5000/${project.thumbnail}`}/>
                </div> */}
            
            <div className='media-files overflow-x-auto max-w-full'>
    <h3 className='font-semibold text-zinc-600 mb-4 text-xl'>Media(Images/Videos)</h3>
    
    <div className='h-[28rem] w-full'>
        {project.mediaFiles?.length > 0 ? (
            <div className='flex gap-4 h-full overflow-x-auto'>
                <div className='relative min-w-[25rem] h-full flex-shrink-0'>
                    {/* For thumbnail, handling all image formats */}
                    <a 
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(`http://localhost:5000/${project.thumbnail}`, '_blank', 'noopener,noreferrer');
                        }}
                        href="#"
                        style={{ cursor: 'pointer' }}
                        className="block h-full w-full"
                    >
                        <img 
                            className='h-full w-full object-cover rounded-lg cursor-pointer' 
                            src={`http://localhost:5000/${project.thumbnail}`}
                            alt="Thumbnail"
                        />
                        <h4 className='absolute top-4 left-5 text-zinc-100 bg-zinc-600/60 px-4 py-1 rounded-lg'>Thumbnail</h4>
                    </a>
                </div>
                
                {project.mediaFiles.map((url, index) => (
                    <div key={index} className='min-w-[25rem] flex-shrink-0 h-full'>
                        {/* Handling all image formats */}
                        <a 
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(`http://localhost:5000/${url}`, '_blank', 'noopener,noreferrer');
                            }}
                            href="#"
                            style={{ cursor: 'pointer' }}
                            className="block h-full w-full"
                        >
                            <img 
                                className="w-full h-full object-cover rounded-lg cursor-pointer" 
                                src={`http://localhost:5000/${url}`}
                                alt={`Media ${index + 1}`}
                            />
                        </a>
                    </div>
                ))}
            </div>
        ) : (
            <h4>No media files shared</h4>
        )}
    </div>
</div>
            </div>
    </div>
  )
}

export default ProjectOverview