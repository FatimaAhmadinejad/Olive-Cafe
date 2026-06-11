import { motion } from "framer-motion";

const CategoryItems = ({ items, categoryName }) => {
  return (
    <div>
      {/* هدر */}
      <div style={{ textAlign: "center", borderBottom: "2px solid #d4c5a0", paddingBottom: "15px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "clamp(18px, 4vw, 22px)", margin: 0, color: "#a0522d" }}>
          {categoryName}
        </h1>
      </div>

      {/* آیتم‌ها */}
      <div>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "clamp(12px, 3vw, 15px)",
              paddingBottom: "10px",
              borderBottom: "1px dashed #e0d5b5",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/50x50?text=No+Image";
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "clamp(13px, 3.5vw, 15px)", margin: 0 }}>{item.name}</h3>
            </div>
            <span style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: "bold", color: "#a0522d" }}>
              {item.price}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;