import React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.15, delay: 0.3 },
  },
  closed: {
    scale: 0,
    opacity: 0,
    transition: { delay: 0.1, duration: 0 },
  },
};

const ButtonAnimationWrapper = (props) => {
  const { show, onClick, children } = props;
  return (
    <motion.div
      variants={variants}
      animate={show ? "open" : "closed"}
      className="floatingBtn"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimationWrapper;
