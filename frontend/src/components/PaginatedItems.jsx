import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const PaginatedItems = ({ items, categoryName, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const currentItems = items.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ textAlign: "center", borderBottom: "2px solid #8B5A2B", paddingBottom: "12px", marginBottom: "15px" }}>
        <h2 style={{ fontSize: "clamp(16px, 4vw, 20px)", margin: 0, color: "#5C3A1E", letterSpacing: "1px" }}>
          {categoryName}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentItems.map((item, idx) => renderItem(item, idx))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px", paddingTop: "8px" }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            style={{
              background: "transparent",
              border: "1px solid #8B5A2B",
              padding: "6px 16px",
              borderRadius: "20px",
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              color: "#8B5A2B",
              fontFamily: "Georgia, serif",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            ◀ PREV
          </button>
          <span style={{ fontSize: "11px", color: "#8B5A2B", alignSelf: "center" }}>
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            style={{
              background: "transparent",
              border: "1px solid #8B5A2B",
              padding: "6px 16px",
              borderRadius: "20px",
              cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
              color: "#8B5A2B",
              fontFamily: "Georgia, serif",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            NEXT ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedItems;