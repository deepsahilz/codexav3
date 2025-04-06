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
  return (
    <div className={`grid  md:grid-cols-2  2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns==2?"lg:grid-cols-2 auto-rows-[25rem]":"lg:grid-cols-3 auto-rows-[19rem]"} `}>
      {
        projects.map((project, i) => (
            <ProjectCard project={project} key={i} />
          ))}
    </div>
  )
}

export default ProjectGrid
