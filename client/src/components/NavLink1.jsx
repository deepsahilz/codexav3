import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavLink1 = ({ label, to }) => {
  const [isHovered, setIsHovered] = useState(false);

 
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer text-xl font-semibold px-3 h-7 flex items-center w-full justify-center"
    >
      <motion.span
        className="block absolute left-1/2 -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: isHovered ? -28 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        explore
      </motion.span>
  
      <motion.span
        className="block absolute top-0 left-1/2 -translate-x-1/2"
        initial={{ y: 28 }}
        animate={{ y: isHovered ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        explore
      </motion.span>
  
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-black"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </motion.div>
  );
  
};

export default NavLink1;
