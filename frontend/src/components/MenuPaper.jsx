// MenuPaper.jsx - ساده و بی‌آلایش
import { motion } from "framer-motion";

const MenuPaper = ({ children, direction }) => {
  const isLeaving = direction === "next";
  
  return (
    <motion.div
      initial={{ x: isLeaving ? "-100%" : "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: isLeaving ? "100%" : "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: "min(650px, 85%)",
        maxWidth: "650px",
        minWidth: "280px",
        backgroundColor: "#452906e2",
        borderRadius: "4px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        padding: "clamp(20px, 5vw, 30px)",
        fontFamily: "Georgia, serif",
        border: "1px solid #7c5e2eab",
        margin: "20px auto",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MenuPaper;