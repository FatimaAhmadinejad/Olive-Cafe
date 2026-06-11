import { useState, useRef, useEffect } from "react";
import { Menu, Phone, Calendar, User, Volume2, VolumeX, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TopIcons = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/bgmusic.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const iconStyle = {
    background: "rgba(139, 90, 43, 0.15)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(139, 90, 43, 0.3)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5C3A1E",
    transition: "all 0.2s ease",
  };

  return (
    <>
      {/* آیکون‌های بیرون کشو (افقی در سمت راست بالا) */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "15px",
          zIndex: 101,
        }}
      >
        {/* آیکون صدا */}
        <button onClick={toggleMusic} style={iconStyle}>
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {/* آیکون منو (باز و بسته کردن کشو) */}
        <button onClick={toggleDrawer} style={iconStyle}>
          <Menu size={20} />
        </button>
      </div>

      {/* کشو باریک */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "120px",
              height: "100%",
              background: "rgba(139, 90, 43, 0.15)",
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(139, 90, 43, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "25px",
              gap: "25px",
              zIndex: 100,
            }}
          >
            {/* آیکون منو (صفحه منو) */}
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer" }}
            >
              <HomeIcon size={20} color="#5C3A1E" />
              <span style={{ color: "#5C3A1E", fontSize: "15px" }}>Home</span>
            </button>
         
            {/* آیکون منو (صفحه منو) */}
            <button
              onClick={() => {
                navigate("/menu");
                setIsOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer" }}
            >
              <Menu size={20} color="#5C3A1E" />
              <span style={{ color: "#5C3A1E", fontSize: "15px" }}>Menu</span>
            </button>

            {/* آیکون تماس */}
            <button
              onClick={() => {
                navigate("/contact");
                setIsOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer" }}
            >
              <Phone size={20} color="#5C3A1E" />
              <span style={{ color: "#5C3A1E", fontSize: "15px" }}>Contact</span>
            </button>

            {/* آیکون رزرواسیون */}
            <button
              onClick={() => {
                navigate("/reservation");
                setIsOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer" }}
            >
              <Calendar size={20} color="#5C3A1E" />
              <span style={{ color: "#5C3A1E", fontSize: "15px" }}>Reservation</span>
            </button>

            {/* آیکون اکانت کاربری */}
            <button
              onClick={() => {
                navigate("/account");
                setIsOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", cursor: "pointer" }}
            >
              <User size={20} color="#5C3A1E" />
              <span style={{ color: "#5C3A1E", fontSize: "15px" }}>Account</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopIcons;