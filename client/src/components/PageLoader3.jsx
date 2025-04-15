import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PageLoader = () => {
  const text = "CODEXA";
  const letters = Array.from(text);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Modern color scheme - monochromatic with accent
  const primaryColor = "#0EF6CC"; // Cyan accent
  const secondaryColor = "#FFFFFF"; // White
  const tertiaryColor = "#101318"; // Dark background

  return (
    <motion.div
      className="fixed inset-0 h-screen bg-black flex items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ backgroundColor: tertiaryColor }}
    >
      <div className="relative w-full max-w-lg">
        {/* Futuristic grid lines */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-px bg-gray-800"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: [0, 0.4, 0.4, 0],
            y: [-50, 0, 0, 50]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.3, 0.7, 1]
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-px bg-gray-800"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: [0, 0.4, 0.4, 0],
            y: [50, 0, 0, -50]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.3, 0.7, 1],
            delay: 0.5
          }}
        />

        {/* Scanner effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${primaryColor}10, transparent)`,
            height: "200%"
          }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Main text with futuristic effects */}
        <div className="flex justify-center items-center overflow-visible relative z-10">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-6xl font-bold inline-block tracking-wider"
              style={{ 
                color: secondaryColor,
                textShadow: `0 0 8px ${primaryColor}80`,
                fontFamily: "'Rajdhani', 'Orbitron', sans-serif" 
              }}
              initial={{ 
                y: -20, 
                opacity: 0,
                filter: "blur(10px)"
              }}
              animate={{ 
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                textShadow: [
                  `0 0 8px ${primaryColor}80`,
                  `0 0 15px ${primaryColor}`,
                  `0 0 8px ${primaryColor}80`
                ]
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Progress line */}
        <motion.div 
          className="absolute -bottom-10 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2.5,
            ease: "easeInOut"
          }}
        />

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-16 left-0 right-0 text-center text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ color: secondaryColor }}
        >
          <motion.span
            animate={{ opacity: loaded ? 0 : [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            INITIALIZING SYSTEM
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            SYSTEM READY
          </motion.span>
        </motion.div>

        {/* Futuristic hexagon element */}
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 w-64 h-64"
          style={{ 
            x: "-50%", 
            y: "-50%",
            opacity: 0.15,
            border: `1px solid ${primaryColor}`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
          animate={{ 
            rotate: 360,
            scale: [0.9, 1.1, 0.9],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            rotate: { 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear"
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Data-like dots in background */}
        <div className="absolute -z-20 inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ 
                width: (i % 3) ? 2 : 1,
                height: (i % 3) ? 2 : 1,
                backgroundColor: i % 5 === 0 ? primaryColor : secondaryColor,
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
                opacity: 0.2
              }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;