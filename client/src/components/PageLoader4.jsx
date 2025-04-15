import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = () => {
  const text = "CODEXA";
  const letters = Array.from(text);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate initialization completion
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated light source */}
        <motion.div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: "30vw",
            height: "30vw",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05) 70%, transparent)",
            top: "30%",
            left: "35%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            perspective: "1000px",
            transform: "rotateX(60deg) scale(2)",
            transformOrigin: "center",
            backgroundPosition: "-20px -20px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main animated title */}
        <div className="flex items-center justify-center mb-10">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              className="relative mx-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother motion
              }}
            >
              {/* Letter with animated mask effect */}
              <motion.div className="relative">
                <span 
                  className="text-6xl font-bold tracking-wider"
                  style={{ 
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "#f8fafc",
                    textShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  {letter}
                </span>
                
                {/* Animated gradient overlay on letters */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ height: "0%" }}
                  animate={{ 
                    height: loaded ? ["0%", "100%", "0%"] : "0%",
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + index * 0.1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <span 
                    className="text-6xl font-bold tracking-wider block"
                    style={{ 
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: "linear-gradient(to bottom, #818cf8, #4f46e5)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))",
                    }}
                  >
                    {letter}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Animated line beneath each letter */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 bg-indigo-500 h-0.5 rounded-full mx-auto"
                style={{ width: "0%" }}
                animate={{ 
                  width: ["0%", "100%", "100%"],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                  times: [0, 0.6, 1],
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Dynamic loading indicator */}
        <motion.div
          className="flex justify-center items-center h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {loaded ? (
            <motion.div
              className="text-sm text-indigo-300 tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Ready
            </motion.div>
          ) : (
            <div className="flex space-x-3 items-center">
              <motion.div
                className="w-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="text-xs text-indigo-400 opacity-80 tracking-widest"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Initializing
              </motion.div>
              <motion.div
                className="w-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;