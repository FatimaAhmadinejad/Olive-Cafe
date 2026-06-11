import { motion, AnimatePresence } from "framer-motion";

const Notebook = ({ children, currentPage }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "min(700px, 90%)",
        maxWidth: "700px",
        minWidth: "300px",
        margin: "40px 0 40px 40px",   // ← تغییر این خط
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "relative",
            backgroundColor: "transparent",
            padding: "20px",
            fontFamily: "Georgia, serif",
            color: "#ffffff",
          }}
        >
          {children[currentPage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Notebook;