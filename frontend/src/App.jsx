import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TopIcons from "./components/TopIcons";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/account');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    navigate('/account');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: "url('/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowY: "auto",
      }}
    >
      <TopIcons user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onSwitchToRegister={() => navigate('/register')} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} onSwitchToLogin={() => navigate('/login')} />} />
        <Route path="/account" element={
          user ? <Account user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} onSwitchToRegister={() => navigate('/register')} />
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;