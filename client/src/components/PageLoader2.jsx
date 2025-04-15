import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PageLoader = () => {
  const text = "CODEXA";
  const letters = Array.from(text);
  const [iteration, setIteration] = useState(0);

  // Color cycling effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIteration((prev) => prev + 1);
    }, 800);
    
    return () => clearInterval(intervalId);
  }, []);

  // Random color generator based on iteration
  const getRandomColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A1", "#33FFF5"];
    return colors[(index + iteration) % colors.length];
  };

  return (
    <motion.div
      className="fixed inset-0 h-screen bg-black flex items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Background pulsing circles */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-purple-500"
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ 
            scale: [0, 2, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-blue-500"
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ 
            scale: [0, 3, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        {/* Main text with crazy effects */}
        <div className="flex overflow-visible relative z-10">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-6xl font-bold font-rejouice inline-block px-1"
              style={{ color: getRandomColor(index) }}
              initial={{ 
                y: -100, 
                opacity: 0,
                rotateX: -90,
                rotateZ: -45
              }}
              animate={{ 
                y: [null, 0, 0, 0],
                opacity: 1,
                rotateX: [null, 0, 0, 0],
                rotateZ: [null, 0, 0, 0],
                scale: [null, 1, 1.5, 1],
              }}
              transition={{
                delay: index * 0.15,
                duration: 1.5,
                ease: "backOut",
                times: [0, 0.4, 0.6, 1],
                repeat: iteration > 0 ? Infinity : 0,
                repeatDelay: 2,
              }}
            >
              {letter}
              
              {/* Add particle effects behind each letter */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                aria-hidden="true"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ 
                      backgroundColor: getRandomColor(index + i),
                      originX: "50%",
                      originY: "50%"
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                      x: [0, (i % 2 ? 1 : -1) * (i + 1) * 20],
                      y: [0, (i % 3 ? 1 : -1) * (i + 1) * 15]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.15 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                  />
                ))}
              </motion.div>
            </motion.span>
          ))}
        </div>

        {/* Extra spinning element */}
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 w-64 h-64 border-4 border-dashed border-cyan-400 rounded-full"
          style={{ 
            x: "-50%", 
            y: "-50%",
            opacity: 0.4 
          }}
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            rotate: { 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </div>
    </motion.div>
  );
};

export default PageLoader;