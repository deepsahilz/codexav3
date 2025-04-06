import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loader_icon from '../assets/images/loader_icon2.svg'
import edit_icon from '../assets/images/edit_icon.svg'
import cloud_upload from '../assets/images/cloud-upload.svg'
import stars_icon from '../assets/images/stars.svg'
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import TagsInput from './TagsInput';
import Avatar from './Avatar';


const AddProject = ({onClose}) => {
  const { register, handleSubmit,formState:{errors} } = useForm({mode:"onchange"});
    const navigate = useNavigate();
    const { control, setValue } = useForm();
    const [projectStatus, setProjectStatus] = useState("completed"); 
    const [mediaFiles, setMediaFiles] = useState([]);
    const [tags, setTags] = useState([]);
    const [isCollabLoading, setIsCollabLoading] = useState(false);

    //collaborator input states
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [collabs, setCollabs] = useState([]);

    //collaborator input handlers
    const addCollab = (collab) => {
      if (!collabs.some(existingCollab => existingCollab._id === collab._id)) {
          setCollabs([...collabs, collab]);
      }
      setQuery("");
      setSuggestions([]);
    };
    const removeCollab = (collabIdToRemove) => {
        setCollabs(collabs.filter((collab) => collab._id !== collabIdToRemove));
    };
    const fetchSuggestions = async (value) => {
      if (!value) return setSuggestions([]);
      try {
        setIsCollabLoading(true);
          const response = await axiosInstance.get(`/api/utils/searchUser?query=${value}`) ;
          // console.log(response.data);
          setSuggestions(response.data);
      } catch (error) {
          console.error("Error fetching suggestions:", error);
      }finally{
        setIsCollabLoading(false);
      }
    };
    const highlightText = (text, query) => {
      if (!query) return text;
      
      const regex = new RegExp(`(${query})`, "gi");
      return text.split(regex).map((part, index) => 
        regex.test(part) ? <span key={index} className="text-blue-500">{part}</span> : part
      );
    };

    useEffect(() => {
      document.body.style.overflow = 'hidden';
    //   document.body.style.marginRight = '17px';  
      
      return () => {
        document.body.style.overflow = 'auto';
        document.body.style.marginRight = '0 ';
      };
    }, []);
    
    const onSubmit = async(data) => {
        const formData = new FormData();
        console.log(data.title);
        console.log(data.type);
      
        // Append form fields
        formData.append("title", data.title);
        formData.append("type", data.type);
        formData.append("description", data.description);
        formData.append("liveLink", data.liveLink);
        formData.append("codeLink", data.codeLink);				
        formData.append("projectStatus", projectStatus);
        formData.append("thumbnail", data.thumbnail[0]);

        mediaFiles.forEach((file) => {formData.append(`mediaFiles`, file);});
        tags.forEach((tag, index) => {formData.append(`tags[${index}]`, tag);});
        collabs.forEach((collab, index) => {formData.append(`collabs[${index}][userId]`, collab._id);
      });      
        
        
        console.log(Object.fromEntries(formData.entries()));
        try{
          const response = await axiosInstance.post("/api/project", formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Set Content-Type only for this request
            },
            showToast: true,
            toastMessage: "Project added successfully"
          });

          console.log("project added successfully:", response.data);
          // setMediaFiles([]);
          onClose();
        }catch(error){

          console.log(error);
        }
    };

    const handleMediaUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = [...mediaFiles, ...selectedFiles];
        setMediaFiles(updatedFiles);
        setValue("mediaFiles", updatedFiles); 
    };

    const handleRemoveMedia = (index) => {
        const updatedFiles = mediaFiles.filter((_, i) => i !== index);
        setMediaFiles(updatedFiles);
        setValue("mediaFiles", updatedFiles); 
    };

  return (
      <div  className='absolute w-full  font-neue z-[25] top-0 h-full min-h-[100vh] flex justify-center overflow-y-scroll animate-fade-in'>
      <div className='bg-black absolute w-full h-[100rem] cursor-zoom-out opacity-70'></div>
      <div className='bg-white absolute z-20 mt-[4.2rem]  border animate-popping shadow-lg overflow-hidden rounded-xl  w-[60rem] max-w-4xl  '>
        {/* overflow-y-scroll */}
      <div className=" h-full pb-10">

        <div className=' border-b mb-6'>
          <div className='px-8 py-4 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <img className='w-[1.4rem] h-[1.4rem]' src={stars_icon}/>
              <h2 className="text-2xl font-bold font-nb text-gray-800">
                Share your work 
              </h2>
            </div>
            <button onClick={onClose} className='text-3xl text-zinc-500 cursor-pointer -mt-1 mr-2 hover:text-red-400 '>&times;</button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8">
          
          {/* title */}
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                {...register("title", {
                  required:{
                    value:true,
                    message:"Title is required"
                  } 
                })}
                placeholder="What’s your project called? (e.g., 'My Portfolio')"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
               {errors.title && (<p className="text-red-500 text-sm mt-2">{errors.title?.message}</p>)}

            </div>
          {/* type */}
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Type</label>
              <input
                type="text"
                {...register("type", {
                  required:{
                    value:true,
                    message:"Project type is required"
                  } 
                })}
                placeholder='e.g., "Web, Api, Mobile"'
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
               {errors.type && (<p className="text-red-500 text-sm mt-2">{errors.type?.message}</p>)}

            </div>

          {/* collaborators */}
          <div className='w-full'>
            <label className="block text-gray-700 font-semibold mb-1">Collaborators</label>
            <div className='relative py-2 border px-2  flex gap-2 rounded-lg'>
              {collabs.length>0&&collabs.map((collab, i) => (
                      <span key={i} className="bg-blue-50 flex gap-1 text-zinc-800 border border-zinc-300  text-sm font-medium  px-2 py-1 rounded-lg items-center">
                        <div className='w-6 h-6  rounded-full overflow-hidden'>
                          <Avatar username={collab.username} avatar_url={collab.avatar} />
                        </div>
                          <h2 className='font-semibold'>{collab.fullName}</h2>
                          <button type="button" onClick={() => removeCollab(collab._id)} className="ml-1 hover:text-red-500 text-zinc-500 text-lg focus:outline-none">✕</button>
                      </span>
                  ))}
              <input
                type="text"
                value={query}
                autoComplete='off'
                {...register("collaborators")}
                placeholder="Add your teammates (e.g.,Type to search...) "
                className='outline-none p-1 bg-inherit flex-1'
                onChange={(e) => {
                  setQuery(e.target.value);
                  fetchSuggestions(e.target.value);
                  setSelectedIndex(0);
              }}
              onKeyDown={(e) => {
                if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) e.preventDefault();
                if (e.key === "Enter" && suggestions[selectedIndex]) addCollab(suggestions[selectedIndex]);
                // if (e.key === "Enter" && suggestions[selectedIndex]) console.log(suggestions[selectedIndex]);
                if (e.key === "ArrowDown") setSelectedIndex((prev) => (prev + 1) % suggestions.length);
                if (e.key === "ArrowUp") setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                if (e.key === "Backspace" && !query && collabs.length) removeCollab(collabs[collabs.length - 1]._id);
            }}
                />
                  {isCollabLoading ? (
                    <div className="absolute top-full h-[50px] flex items-center justify-center w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md  text-center text-gray-500">
                      <span className="animate-spin h-6 w-6 py-2 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <ul className="absolute top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${
                            index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                          }`}
                          onClick={() => addCollab(suggestion)}
                        >
                          <div className="w-9 h-9 rounded-full object-cover overflow-hidden">
                            <Avatar username={suggestion.username} avatar_url={suggestion.avatar} />
                          </div>
                          <div className="flex font-semibold text-sm flex-col">
                            <h2 className="capitalize">{highlightText(suggestion.fullName, query)}</h2>
                            <h2 className="text-zinc-500">@{highlightText(suggestion.username, query)}</h2>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    query && (
                      <div className="absolute top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md p-3 text-center text-gray-500">
                        No results found for "{query}"
                      </div>
                    )
                  )}


                
            </div>

            </div>
          
          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Description
            </label>
            <textarea
              {...register("description", {
                required:{
                  value:true,
                  message:"Description is required"
                }
              })}
              placeholder="Describe your project"
              rows="5"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (<p className="text-red-500 text-sm mt-2">{errors.description?.message}</p>)}

          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-semibold text-gray-700">
              Project Thumbnail
            </label>
            <h2 className='text-gray-600 text-[14px] mb-2'>Choose an image/screenshot of your project for thumbnail</h2>
            
            <input
              type="file"
              {...register("thumbnail", {
                required:{
                  value:true,
                  message:"Thumbnail is required"
                }
              })}
              className="w-full  p-3 border rounded-lg focus:outline-none"
            />
            {errors.thumbnail&& (<p className="text-red-500 text-sm mt-2">{errors.thumbnail?.message}</p>)}

          </div>

          {/* add media */}
          <div>
      <label className="block text-zinc-700 font-semibold ">
        Add Media (Images/Videos/Designs)
      </label>
      <h2 className='text-gray-600 text-[14px] mb-3'>Choose multiples images/videos of your working project.</h2>

      <Controller
        name="mediaFiles"
        control={control}
        
        defaultValue={[]}
        render={() => (
          <div className="flex flex-wrap gap-3">
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-3 py-2 rounded-lg"
              >
                <span className="text-gray-800 text-sm max-w-[10rem] truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(index)}
                  className="ml-2 text-red-500 font-medium hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <label
              htmlFor="media-upload"
              className="flex flex-col gap-1 items-center w-full h-[10rem] text-xl font-bold justify-center  bg-stone-100  border-2 border-dashed border-zinc-300 rounded-md hover:bg-stone-200 hover:border-stone-400 cursor-pointer"
            >
              <img src={cloud_upload} className='w-8 h-8 mb-1'/>
              <p className='text-sm text-zinc-700'>Choose a file or drag & drop it here.</p>
              <p className='text-sm text-zinc-500'>txt,docx,pdf,jpeg,xlsx - Up to 50MB</p>
              
            </label>
            <input
              id="media-upload"
              type="file"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
            />
          </div>
        )}
      />
          </div>

          {/* Live link */}
          <div>
            <label className="block text-zinc-700 font-semibold ">Live Link</label>
            <input
              type="url"
              {...register("liveLink", { required: true })}
              placeholder="https://yourwebsite.com"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* code link */}
          <div>
            <label className="block text-zinc-700 font-semibold ">Code Link</label>
            <input
              type="url"
              {...register("codeLink", { required: true })}
              placeholder="https://github.com/username/repo"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Add tech stack */}
          <TagsInput label = "Tech Stack" placeholder="e.g., React, Node.js, UI/UX" subLabel="Add tags related to your Tech Stack" tags={tags} setTags={setTags} control={control}/>

        {/* project status */}
          <div>
            <label className="block text-zinc-700 font-semibold  mb-2">
              Project Status
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setProjectStatus("completed")}
                className={`py-2 px-6 rounded-lg text-white font-medium ${
                  projectStatus === "completed"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Completed
              </button>
              <button
                type="button"
                onClick={() => setProjectStatus("in-progress")}
                className={`py-2 px-6 rounded-lg text-white font-medium ${
                  projectStatus === "in-progress"
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                In Progress
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Save Project
            </button>
          </div>

        </form>
     
    </div>

    </div>
    </div>
  );
}

export default AddProject