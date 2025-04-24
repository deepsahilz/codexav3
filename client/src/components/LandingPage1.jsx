import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import commentIcon from "../assets/images/comment_icon.svg";
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContextProvider';

const LandingPage1 = () => {
  const phrases = [
    "Be the dev your younger self stalks on Codexa.",
    "Build today what others will use tomorrow.",
    "Code less, create more with Codexa.",
    "Inspire others with your digital creations.",
    "Turn ideas into reality, one line at a time."
  ];

  const features = [
    { title: "Share Your Work", description: "Showcase your projects to a community of developers" },
    { title: "Find Collaborators", description: "Connect with like-minded creators on exciting projects" },
    { title: "Get Inspired", description: "Discover trending projects in the developer community" }
  ];
  
  const stats = [
    { number: "10K+", label: "Active Developers" },
    { number: "50K+", label: "Projects Shared" },
    { number: "2M+", label: "Monthly Views" }
  ];
  
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { isLoggedIn, loading } = useUserContext();
  const [activeTab, setActiveTab] = useState(0);
  
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
      setPhrseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  // Animation variants for features
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Fix typo in the effect
  const setPhrseIndex = setPhraseIndex;

  // Sample project categories
  const categories = ["Web", "Mobile", "AI", "Design", "Data Science"];

  if(isLoggedIn) return <Navigate to="/explore" />
  return (
    <div className=''>
      <div className='w-full font-neue min-h-[calc(100vh-3.8rem)] px-7 pt-5 bg-zinc-200'>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-3/5">
            <h3 className='text-lg font-semibold text-zinc-700 mt-10 mb-4'>Hello, Welcome to Codexa.  </h3>
            <h1 className='text-5xl md:text-7xl text-zinc-950 font-semibold'>
              Showcase your work,<br/> connect with others,<br/> stay inspired<br/> by{' '}
              <span className='text-zinc-500'>real-world projects.</span>
            </h1>
            <div className='mt-12'>
              <Link className='' to="/signup">
                <button className='px-8 text-white py-4 rounded-md bg-zinc-950 hover:bg-bloopy transition-all font-semibold text-lg'>Get started</button>
              </Link>
              {/* <Link className='ml-4' to="/explore">
                <button className='px-8 py-4 rounded-md bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100 transition-all font-semibold text-lg'>Browse projects</button>
              </Link> */}
            </div>
          </div>
          
          <motion.div 
            className='mt-12 md:mt-16 md:w-2/5 flex justify-end'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className='bg-white p-6 h-40 rounded-lg shadow-md w-full'>
              <motion.p 
                className='text-xl font-semibold flex items-start gap-2 text-zinc-600'
              >
                <img className='w-4 h-4 opacity-80 mt-1' src={commentIcon} alt="comment icon"/>
                "<span>{displayedText}</span><motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block"
                >|</motion.span>"
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        {/* Stats section */}
        <motion.div
          className="my-20 py-8 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center py-4">
                <div className="text-4xl font-bold text-zinc-900">{stat.number}</div>
                <div className="text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Features section */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Why developers choose Codexa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                <p className="text-zinc-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Project categories section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-800 mb-6">Explore by category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium text-zinc-800">{category}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Testimonial section */}
        <motion.div 
          className="mb-16 bg-white p-8 rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-zinc-800 mb-6">What our users say</h2>
          <div className="flex overflow-x-auto gap-4 py-2">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={index} 
                className={`min-w-72 p-6 border border-zinc-200 rounded-lg ${activeTab === index ? 'bg-zinc-50' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-300"></div>
                  <div className="ml-3">
                    <div className="font-semibold text-zinc-900">Developer {index + 1}</div>
                    <div className="text-sm text-zinc-500">Software Engineer</div>
                  </div>
                </div>
                <p className="text-zinc-700">"Codexa has been a game-changer for finding collaboration opportunities and showcasing my projects to the world."</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="mb-16 bg-zinc-900 text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to join the community?</h2>
          <p className="text-zinc-300 mb-6 max-w-lg mx-auto">Connect with thousands of developers, showcase your work, and find your next collaboration opportunity.</p>
          <Link to="/signup">
            <button className="px-8 py-4 bg-white text-zinc-900 rounded-md font-semibold text-lg hover:bg-zinc-100 transition-all">Create your account</button>
          </Link>
        </motion.div>
        
        {/* Social proof section */}
        <div className="py-8 mb-12 text-center">
          <p className="text-zinc-600 mb-4">Trusted by developers from</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-zinc-400 font-semibold">Google</div>
            <div className="text-zinc-400 font-semibold">Microsoft</div>
            <div className="text-zinc-400 font-semibold">Meta</div>
            <div className="text-zinc-400 font-semibold">Amazon</div>
            <div className="text-zinc-400 font-semibold">Apple</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage1;