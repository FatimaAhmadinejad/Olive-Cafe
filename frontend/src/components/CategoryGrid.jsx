import { motion } from "framer-motion";

const CategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "15px" }}>
      {categories.map((cat, index) => (
        <motion.button
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onCategoryClick(cat.id, cat.name)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "15px 10px",
            backgroundColor: "transparent",
            border: "1px solid #8B5A2B",
            borderRadius: "12px",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(139, 90, 43, 0.1)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/60x60?text=No+Image";
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#5C3A1E", textAlign: "center" }}>
            {cat.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryGrid;