import React from 'react'
import { Link } from 'react-router-dom'
import like_icon from '../assets/images/like_icon.svg'
import comment_icon from '../assets/images/comment_icon.svg'
import arrow_icon from '../assets/images/arrow_top_right.svg'

const projectgrid = () => {

    const feeddata=[
        {title:"responsive react frontend website",thumbnail:"./src/assets/images/thumbnail1.jpg",likes:23,comments:7,username:"miles_21",userdp:"./src/assets/images/dp1.jpg",techStack:["Reactjs","Tailwindcss", "Web dev"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"Hotel management system",thumbnail:"./src/assets/images/thumbnail2.png",likes:23,comments:7,username:"karl_urban",userdp:"./src/assets/images/dp1.jpg",techStack:["Php","Html", "Javascript"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"whatsapp automation with python",thumbnail:"./src/assets/images/thumbnail3.jpg",likes:23,comments:7,username:"karan_321",userdp:"./src/assets/images/dp3.png",techStack:["Python","Tensorflow", "Bootstrap"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"Heap sort algorithm in c++",thumbnail:"./src/assets/images/thumbnail1.jpg",likes:23,comments:7,username:"gwen_stacy_11",userdp:"./src/assets/images/dp4.png",techStack:["Reactjs","Tailwindcss", "Web dev"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"Heap sort algorithm in c++",likes:23,comments:7,username:"gwen_stacy_11",userdp:"./src/assets/images/dp5.png",techStack:["Reactjs","Tailwindcss", "Web dev"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"Heap sort algorithm in c++",likes:23,comments:7,username:"gwen_stacy_11",userdp:"./src/assets/images/dp6.png",techStack:["Reactjs","Tailwindcss", "Web dev"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
        {title:"Heap sort algorithm in c++",likes:23,comments:7,username:"gwen_stacy_11",userdp:"./src/assets/images/dp7.png",techStack:["Reactjs","Tailwindcss", "Web dev"],
        description:"Lorem ipsum dolor sit amet consectetur adip....",},
    ]

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-10'>
                {feeddata.map((post,i)=>(
                    <div key={i}>
                    <div className='flex flex-col gap-2'>
                        <div className='w-full cursor-pointer group relative h-[15rem] rounded-lg overflow-hidden bg-stone-400 '>

                            <div className='opacity-0 transition-opacity group-hover:opacity-40 bg-black h-full w-full absolute' />

                            <div className='absolute top-3 text-white pl-4 pr-5 w-full flex justify-between items-center gap-2'>
                                <div className='flex gap-2'>
                                    <div className="w-6 h-6 rounded-full overflow-hidden shadow-lg">
                                        <img className='w-full h-full object-cover ' src={post.userdp}/>
                                    </div>
                                    <Link to="/profile" className='hover:underline cursor-pointer '><h4 className='shadow-lg'>{post.username}</h4></Link>
                                </div>

                                <a title='See it live' className='opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <div className='w-6 h-6 flex justify-center items-center rounded-md border hover:border-blue-600 hover:bg-blue-600'>
                                        <img className='invert w-5 h-5 ' src={arrow_icon}/>
                                    </div>
                                </a>
                            </div>

                            <div className='opacity-0 transition-all group-hover:opacity-100 flex gap-3 absolute left-4 bottom-3 text-white'>
                                <div className='flex items-center gap-1'>
                                    <img className='w-4 h-4 invert' src={like_icon}/> 
                                    <div>{post.likes}</div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img className='w-4 h-4 invert' src={comment_icon}/> 
                                    <div>{post.comments}</div>
                                </div>
                            </div>

                            {/* <div className="bg-black-gradient hidden absolute h-40 group-hover:flex bottom-0 left-0 right-0 opacity-70 "></div> */}
                            
                            <img src={post.thumbnail}
                            className='object-cover w-full h-full'/>
                            
                        </div>
                        
                        <div className='ml-1 space-y-2'>
                            <a href='#'>
                                <h1 className='text-[1.25rem] mt-1 leading-none  capitalize'>{post.title}</h1>
                            </a>
                            <p className='text-stone-500 '>{post.description}</p>
                            <div className='flex gap-2'>
                                {post.techStack.map((stackk,j)=>(
                                    // <div key={j} className='border text-[14px] pointer-events-none whitespace-nowrap  text-stone-500 bg-stone-200 border-stone-300 px-2 py-[2px] transition-colors rounded-[5px]   '>
                                    <div key={j} className='border text-[14px] pointer-events-none whitespace-nowrap  text-stone-600 uppercase border-stone-500 px-3 py-[2px] transition-colors rounded-full   '>
                                    {stackk}
                                    </div>
                                    ))} 
                            </div>
                           
                            

                        </div>

                    </div>
                    {/* {i===5 && (<div className='col-span-3 bg-blue-200 h-[15rem] p-10 -mx-10'>
                        <h1 className='text-2xl font-semibold'>Hey, its an ad buddy</h1>
                    </div>)} */}
                    </div>
                ))}
            </div>
  )
}

export default projectgrid