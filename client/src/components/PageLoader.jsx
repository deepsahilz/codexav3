import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const text = "CODEXA";
  
  // Create array of letters for individual animation
  const letters = Array.from(text);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 h-screen bg-black text-white flex items-center justify-center z-[9999]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 0.8, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
      >
        <div className="flex overflow-hidden">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-4xl font-bold font-rejouice inline-block"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.23, 1.0, 0.32, 1.0]
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;