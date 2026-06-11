import { useState, useEffect } from "react";
import axios from "axios";
import Notebook from "../components/Notebook";
import CategoryGrid from "../components/CategoryGrid";
import BackButton from "../components/BackButton";
import PaginatedItems from "../components/PaginatedItems";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [pageStack, setPageStack] = useState([{ type: "menu", id: null }]);

  // دریافت داده‌ها از بک‌اند
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // دریافت دسته‌بندی‌ها
        const categoriesRes = await axios.get("http://localhost:5000/api/menu/categories");
        setCategories(categoriesRes.data);
        
        // دریافت همه محصولات
        const productsRes = await axios.get("http://localhost:5000/api/menu/products");
        
        // گروه‌بندی محصولات بر اساس categoryId
        const productsByCategory = {};
        productsRes.data.forEach(product => {
          const catId = product.categoryId;
          if (!productsByCategory[catId]) {
            productsByCategory[catId] = [];
          }
          productsByCategory[catId].push(product);
        });
        setProducts(productsByCategory);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const pages = [];

  const Header = () => (
    <div style={{ fontSize: "clamp(36px, 6vw, 52px)",
            color: "#5C3A1E",
            marginBottom: "20px",
            fontFamily: "'Playfair Display', Georgia, serif",  
            fontStyle: "italic",  
            letterSpacing: "1px", }}>
      <h1 style={{ fontSize: "clamp(25px, 10vw, 29px)", margin: 0, color: "#5C3A1E", letterSpacing: "2px" }}>Olive Menu</h1>
      <p style={{ fontSize: "clamp(9px, 3vw, 11px)", color: "#8B5A2B", marginTop: "4px" }}>EST. 2024</p>
    </div>
  );

  const Footer = ({ text }) => (
    <div style={{ textAlign: "center", marginTop: "8px", fontSize: "clamp(7px, 2.5vw, 9px)", color: "#8B5A2B" }}>
      {text}
    </div>
  );

  if (loading) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        color: "#5C3A1E"
      }}>
        Loading menu...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        color: "red"
      }}>
        {error}
      </div>
    );
  }

  // تبدیل categories به فرمت مورد نیاز CategoryGrid
  const categoryItems = categories.map(cat => ({
  id: cat._id,  // ← فقط _id مونگو
  customId: cat.customId,  // ← برای استفاده احتمالی بعدی
  name: cat.name,
  image: cat.image,

  }));

  // صفحه منو (صفحه 0)
  pages.push(
    <div key="menu" style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <CategoryGrid
        categories={categoryItems}
        onCategoryClick={(id, name) => {
          setPageStack([...pageStack, { type: "category", id, name }]);
          setCurrentPage(pageStack.length);
          setDirection("next");
        }}
      />
      <Footer text="Click on any category to view items" />
    </div>
  );

  // صفحات دسته‌بندی
  for (let i = 1; i < pageStack.length; i++) {
    const item = pageStack[i];
    if (item.type === "category") {
      const categoryProducts = products[item.id] || [];
      
      pages.push(
        <div key={item.id} style={{ display: "flex", flexDirection: "column" }}>
          <BackButton
            onClick={() => {
              setPageStack(pageStack.slice(0, pageStack.length - 1));
              setCurrentPage(pageStack.length - 2);
              setDirection("prev");
            }}
          />
          <PaginatedItems
            items={categoryProducts}
            categoryName={item.name}
            renderItem={(product, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "15px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #8B5A2B",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/50x50?text=No+Image"; }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "clamp(12px, 3.5vw, 14px)", margin: 0, color: "#5C3A1E" }}>{product.name}</h3>
                </div>
                <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: "bold", color: "#8B5A2B" }}>
                  {product.price}
                </span>
              </div>
            )}
          />
          <Footer text="* Prices include tax" />
        </div>
      );
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Notebook
        children={pages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        direction={direction}
        setDirection={setDirection}
      />
    </div>
  );
};

export default Menu;
