import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import heroSymbol from "./assets/images (1).png";

import Navbar from "./components/Navbar";
import Questionnaire from "./pages/Questionnaire";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import FeaturesShowcase from "./components/FeaturesShowcase";

import "./App.css";



const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};


function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}



function Home({ darkMode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 45;
    const y = (window.innerHeight / 2 - e.clientY) / 45;
    setOffset({ x, y });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div 
        className="hero-container" 
        onMouseMove={handleMouseMove}
      >
        {/* Subtle glowing background light fields */}
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        {/* Parallax Background Symbol */}
        <img
          src={heroSymbol}
          className="hero-symbol"
          alt="Nivaar Symbol"
          style={{
            transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1.5}px, -150px) rotate(${offset.x * 0.1}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />

        <div className="hero-splitscreen">
          {/* LEFT SIDE: POWERFUL HEADLINE & COPY */}
          <div 
            className="hero-text-side"
            style={{
              transform: `translate3d(${offset.x * -0.5}px, ${offset.y * -0.5}px, 0)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <h1>
              Optimize Your Cloud. <br />
              <span>SAVE SMARTER.</span>
            </h1>

            <p>
              An intelligent, AI-powered FinOps platform to visualizes topology networks, detect anomaly spikes, and optimize multi-cloud infrastructure dynamically.
            </p>

            <button
              className="hero-btn"
              onClick={() => {
                const company = localStorage.getItem("company");
                if (!company) {
                   window.location.href = "/login";
                } else {
                   window.location.href = "/questionnaire";
                }
              }}
            >
              Start Optimization 🚀
            </button>
          </div>

          {/* RIGHT SIDE: PREMIUM INTERACTIVE 3D GLASS CARD STACK */}
          <div className="hero-visual-side">
            <div 
              className="glass-3d-card"
              style={{
                transform: `perspective(1000px) rotateY(${offset.x}deg) rotateX(${-offset.y}deg) translate3d(0, 0, 50px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Glowing Card Headers */}
              <div className="glass-card-header">
                <span className="dot pulse"></span>
                <span className="title">LIVE FINOPS AGENT ACTIVE</span>
              </div>

              {/* Spend Stats Visual */}
              <div className="glass-cost-comparison">
                <div style={{ marginBottom: "15px" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>UNOPTIMIZED SPEND</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="bar unoptimized" style={{ width: "85%" }}></div>
                    <strong style={{ fontSize: "12px", color: "#ef4444" }}>$15,000</strong>
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>NIVAAR OPTIMIZED</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="bar optimized" style={{ width: "30%" }}></div>
                    <strong style={{ fontSize: "12px", color: "#10b981" }}>$4,500</strong>
                  </div>
                </div>
              </div>

              {/* 3D Glass Card Inner Details */}
              <div className="glass-inner-metric">
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#10b981" }}>70% Savings</div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>Estimated baseline cloud bill reduction.</div>
              </div>

              {/* Floating badges surrounding the card in 3D */}
              <div className="floating-badge badge-top" style={{ transform: `translateZ(30px)` }}>
                📦 Supabase Active
              </div>
              <div className="floating-badge badge-bottom" style={{ transform: `translateZ(40px)` }}>
                🤖 Gemini 2.5 Flash
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Platform Feature Showcase Playground */}
      <FeaturesShowcase darkMode={darkMode} />
      
      {/* Articles Section on Home Page */}
      <div id="articles-section" style={{ position: "relative", zIndex: 10, background: darkMode ? "#020617" : "#eef2ff", width: "100%" }}>
        <Articles darkMode={darkMode} />
      </div>
      
      {/* Footer Section */}
      <Footer darkMode={darkMode} />
    </div>
  );
}


function App() {

  const [darkMode, setDarkMode] = useState(false);

  const [companyData, setCompanyData] = useState({
    basics: {},
    infra: {},
    goals: {},
    advanced: {},
  });

  // HYDRATE STATE FROM DATABASE ON BOOT (FOR DIRECT DEEPLINKS / NEW TABS)
  useEffect(() => {
    const localCompany = JSON.parse(localStorage.getItem("company") || "{}");
    if (localCompany.id) {
      fetch(`http://localhost:5000/api/data/latest/${localCompany.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.basics) {
            setCompanyData({
              basics: data.basics,
              infra: data.infra,
              goals: data.goals,
              advanced: data.advanced,
              optimization: data.optimization
            });
          }
        })
        .catch((err) => console.error("Failed to restore dashboard state on boot:", err));
    }
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #020617, #0f172a)"
          : "linear-gradient(135deg, #eef2ff, #f8fafc)",
        transition: "0.4s ease",
      }}
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />

        {/* Protected */}
        <Route
          path="/questionnaire"
          element={
            <PrivateRoute>
              <Questionnaire
                darkMode={darkMode}
                companyData={companyData}
                setCompanyData={setCompanyData}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard
                darkMode={darkMode}
                companyData={companyData}
              />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;




