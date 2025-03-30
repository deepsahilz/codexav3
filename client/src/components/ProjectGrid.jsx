import React from 'react'
import ProjectCard from './ProjectCard';

const ProjectGrid = ({projects,className,columns}) => {

  // console.log(column)
  return (
    <div className={`grid  md:grid-cols-2  2xl:grid-cols-4 gap-x-5 gap-y-10 ${className || ''} ${columns==2?"lg:grid-cols-2 auto-rows-[25rem]":"lg:grid-cols-3 auto-rows-[21rem]"}` }>
        {projects.map((project,i)=>(
            <ProjectCard project={project} key={i}/>
        ))}
        {/* <h1>hello</h1> */}
    </div>
  )
}

export default ProjectGrid;