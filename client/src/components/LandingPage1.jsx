import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import commentIcon from "../assets/images/comment_icon.svg";

const LandingPage1 = () => {
  const phrases = [
    "Be the dev your younger self stalks on Codexa.",
    "Build today what others will use tomorrow.",
    "Code less, create more with Codexa.",
    "Inspire others with your digital creations.",
    "Turn ideas into reality, one line at a time."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 70; // Faster when deleting
    const currentPhrase = phrases[phraseIndex];
    
    // If we're typing and haven't completed the phrase
    if (!isDeleting && displayedText !== currentPhrase) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } 
    // If we've completed typing the phrase, wait before starting to delete
    else if (!isDeleting && displayedText === currentPhrase) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    // If we're deleting and have characters left
    else if (isDeleting && displayedText !== "") {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText.substring(0, displayedText.length - 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } 
    // If we've finished deleting, move to next phrase
    else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  return (
    <div className=''>
      <div className='w-full font-neue h-screen px-7 pt-5 bg-zinc-200'>
        <h3 className='text-lg font-semibold text-zinc-700 mt-10 mb-4'>Hello, everyone.</h3>
        <h1 className='text-7xl text-zinc-950 font-semibold'>
          Showcase your work,<br/> find collaborators, stay inspired<br/> by{' '}
          <span className='text-zinc-500'>real-world builds.</span>
        </h1>
        <div className='flex mt-12 items-start justify-between'>
          <Link className='' to="/signup">
            <button className='px-5 text-white py-3 rounded-md bg-zinc-950 hover:bg-bloopy transition-all'>Get started</button>
          </Link>
          <motion.p 
            className='text-xl font-semibold flex items-center gap-2 text-zinc-600'
          >
            <img className='w-4 h-4 opacity-80' src={commentIcon} alt="comment icon"/>
            "<span>{displayedText}</span><motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block"
            >|</motion.span>"
          </motion.p>
        </div>
      </div>
      <div className='w-full h-screen bg-zinc-300'>
      </div>
      <div className='w-full h-screen bg-zinc-500'>
      </div>
    </div>
  );
};

export default LandingPage1;