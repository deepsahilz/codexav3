# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<br>
<br>

# Custom npm packages

**Tailwindcss, React-router-dom, Axios**


<br>

###  **Tailwindcss setup :**
1. npm install -D tailwindcss postcss autoprefixer

2. npx tailwindcss init -p

3. content: [ <br>
    "./index.html",<br>
    "./src/**/*.{js,ts,jsx,tsx}",<br>
   ],
   
4. @tailwind base;<br>
   @tailwind components;<br>
   @tailwind utilities;

5. npm run dev


<!-- 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ projectId }) => {
  const [liked, setLiked] = useState(false);  // Track whether the project is liked
  const [likeCount, setLikeCount] = useState(0);  // Track the like count

  useEffect(() => {
    // Fetch initial like count and status from the backend
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`/api/project/${projectId}/likes`);
        setLikeCount(response.data.likeCount);
        setLiked(response.data.isLiked);
      } catch (error) {
        console.log('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [projectId]);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        // Unlike the project
        await axios.delete(`/api/project/${projectId}/like`);
        setLikeCount(likeCount - 1);
      } else {
        // Like the project
        await axios.post(`/api/project/${projectId}/like`);
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked); // Toggle like status
    } catch (error) {
      console.log('Error toggling like status:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLikeToggle} className={`like-btn ${liked ? 'liked' : ''}`}>
        {liked ? 'Unlike' : 'Like'} ({likeCount})
      </button>
    </div>
  );
};

export default LikeButton; -->
