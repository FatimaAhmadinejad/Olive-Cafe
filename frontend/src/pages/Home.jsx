import { motion } from "framer-motion";

const Home = () => {
  const images = [
    { src: "cafe1.jpg", align: "flex-end", caption: "Where olive leaves meet coffee steam." },
    { src: "cafe2.jpg", align: "flex-start", caption: "No rush. No noise. Just slow sips and soft shadows." },
    { src: "cafe3.jpg", align: "flex-end", caption: "Take a breath. Stay awhile." },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 40px",
        maxWidth: "600px",
      }}
    >
      {/* متن خوش‌آمدگویی اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "50px" }}
      >
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 52px)",
            color: "#5C3A1E",
            marginBottom: "20px",
            fontFamily: "'Playfair Display', Georgia, serif",  // ← اضافه کن
            fontStyle: "italic",  // ← اختیاری: کج برای حس شاعرانه‌تر
            letterSpacing: "1px",
          }}
        >
          Welcome to our corner
        </h1>
      </motion.div>

      {/* تصاویر و کپشن‌ها به صورت زیگزاگ */}
      {images.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: item.align,
            marginBottom: "40px",
          }}
        >
          <img
            src={`/${item.src}`}
            alt={`Cafe view ${index + 1}`}
            style={{
              width: "100%",
              maxWidth: index === 1 ? "320px" : "420px",
              height: "auto",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x280?text=Cafe+Image";
            }}
          />
          <p
            style={{
              fontSize: "clamp(14px, 3vw, 18px)",
              color: "#8B5A2B",
              fontStyle: "italic",
              marginTop: "15px",
              maxWidth: "400px",
              textAlign: index === 1 ? "left" : "right",
            }}
          >
            {item.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;