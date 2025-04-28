import React from 'react'
import ProjectCard from './ProjectCard2'
import ProjectSkeletonCard from './ProjectSkeletonCard'

const ProjectGrid = ({ projects, className,columns,isLoading }) => {
  const skeletonCount = 8

  if (isLoading) return (
    <div className={`grid md:grid-cols-2 2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns === 2 ? "lg:grid-cols-2 auto-rows-[25rem]" : "lg:grid-cols-3 auto-rows-[21rem]"}`}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <ProjectSkeletonCard key={i} />
      ))}
    </div>
  )
  if (projects.length === 0) return (
    <div className={`grid md:grid-cols-2 2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns === 2 ? "lg:grid-cols-2 auto-rows-[25rem]" : "lg:grid-cols-3 auto-rows-[21rem]"}`}>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-xl font-semibold text-gray-500'>No Projects Found</h1>
      </div>
    </div>
  )
  return (
    <div className={`grid  md:grid-cols-2 min-h-[100vh]  2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns==2?"lg:grid-cols-2 auto-rows-[25rem]":"lg:grid-cols-3 auto-rows-[19rem]"} `}>
      {
        projects.map((project, i) => (
            <ProjectCard project={project} key={i} />
          ))}
    </div>
  )
}

export default ProjectGrid
