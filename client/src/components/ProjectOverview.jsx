import React from 'react'

const ProjectOverview = ({project}) => {
  return (
    <div>
        <div className='flex flex-col gap-7'>
                <div>
                    <h4 className='font-semibold text-zinc-600 mb-1'>Description</h4>
                    <p className='text-zinc-600 max-w-[40rem]'>{project.description}</p>
                </div>

                <div>
                    <h4 className='font-semibold text-zinc-600 mb-1'>Core Features</h4>
                    <ul className="list-disc pl-5 text-zinc-600">
                        <li>Utilizes ChatGPT's API to generate Ghibli-style artwork.</li>
                        <li>Implements text-to-image model integration for AI-driven visuals.</li>
                        <li>Supports fine-tuned prompt engineering for style accuracy.</li>
                        <li>Optimized rendering pipeline for high-resolution outputs.</li>
                        <li>Built with React and TailwindCSS for a responsive UI.</li>
                    </ul>

                </div>

                <div className='flex'>
                    <h4 className='font-semibold text-zinc-600 mb-1'>Project Type</h4>
                    <p className='text-zinc-600 ml-10'>Web app</p>
                </div>

                

                <div>
                    <h4 className='font-semibold text-zinc-600 mb-1'>Tech Stack</h4> 
                    <div className='flex gap-2'>
                        {project.tags?.map((tag,index)=>(
                            <div key={index} className='py-1 px-3 border rounded-lg bg-zinc-300'>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>


                {/* <div className='thumbnail'>
                    <h3 className='font-semibold text-zinc-600 mb-1'>Thumbnail</h3>
                    <img className=' h-[20rem]' src={`http://localhost:5000/${project.thumbnail}`}/>
                </div> */}
            
                <div className='media-files'>
                    <h3 className='font-semibold text-zinc-600  mb-2'>Media(Images/Videos)</h3>
                    {project.mediaFiles?.length>0?(
                        <div className='flex gap-4 overflow-y-auto '>
                            <div className='relative h-[20rem]'>
                                <img className='h-full w-full object-cover' src={`http://localhost:5000/${project.thumbnail}`}/>
                                <h4 className='absolute top-4 left-5 text-zinc-100 bg-zinc-600/60 px-4 py-1 rounded-lg '>Thumbnail</h4>
                            </div>
                        {project.mediaFiles.map((url,index)=>(
                            <div key={index} className='min-w-[25rem] h-[20rem]'>
                                <img className="w-full h-full object-cover" src={`http://localhost:5000/${url}`}/>
                            </div>
                        ))}
                        </div>
                    
                    ):(<h4>no media files</h4>)}
                </div>
            </div>
    </div>
  )
}

export default ProjectOverview