import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useUserContext } from "./context/UserContextProvider";

const CommentBar = ({placeholder,projectId,commentId,setComments}) => {
  const [newComment, setNewComment] = useState("");
  const {user} = useUserContext();

  
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      projectId,
      parentId: commentId || null,  
    };
    try {
      const { data } = await axiosInstance.post(`/api/project/${projectId}/comment`, commentData);
      console.log(data)

      const newCommentWithUser = {
        ...data.comment, // Keep everything from the backend response
        username: user.username, // Use values already available in frontend
        avatar: user.avatar
    };

    setComments(prevComments => [newCommentWithUser, ...prevComments]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center border mb-3 border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
      <input
        type="text"
        placeholder={placeholder||"Write a comment..."}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
        className="flex-1 outline-none bg-transparent px-2"
      />
      <button
        onClick={handleCommentSubmit}
        className="text-blue-500 hover:text-blue-600 disabled:opacity-50"
        disabled={!newComment.trim()}
      >
        ➤
      </button>
    </div>
  );
};

export default CommentBar;
