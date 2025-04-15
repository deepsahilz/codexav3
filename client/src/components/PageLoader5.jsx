import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = () => {
  const text = "CODEXA";
  const letters = Array.from(text);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 h-screen bg-black font-rejouice flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Main text animation */}
        <div className="flex items-center justify-center mb-12">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              className="relative mx-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.4 + index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Letter with glow effect */}
              <motion.span
                className="text-4xl font-bold font-rejouice text-white"
                style={{ 
                  // fontFamily: "'Inter', sans-serif",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                }}
                animate={{
                  textShadow: loaded 
                    ? ["0 0 10px rgba(255, 255, 255, 0.3)", 
                      "0 0 20px rgba(255, 255, 255, 0.6)", 
                      "0 0 10px rgba(255, 255, 255, 0.3)"]
                    : "0 0 10px rgba(255, 255, 255, 0.3)",
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
              
              {/* White line beneath each letter */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 bg-white h-px mx-auto"
                style={{ width: "0%" }}
                animate={{ 
                  width: ["0%", "100%"],
                  opacity: [0, 0.8],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.1,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Simple loading indicator */}
        <motion.div
          className="flex justify-center items-center h-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {loaded ? (
            <motion.div
              className="text-xs text-white tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4 }}
            >
              Ready
            </motion.div>
          ) : (
            <div className="flex space-x-4 items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;