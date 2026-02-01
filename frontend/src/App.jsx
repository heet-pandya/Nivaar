import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import heroSymbol from "./assets/images (1).png";

import Navbar from "./components/Navbar";
import Questionnaire from "./pages/Questionnaire";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { Link } from "react-router-dom";

import Article from "./pages/Article";

import "./App.css";

// 🔐 Auth check
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// 🔒 Protected route wrapper
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

// 🏠 HOME PAGE
function Home({ darkMode }) {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-container">
        <img
          src={heroSymbol}
          className="hero-symbol"
          alt="Nivaar Symbol"
        />

        <div className="hero-content">
          <h1>
            Optimize Your Cloud. <span>Save Smarter.</span>
          </h1>

          <p>
            AI-powered insights to reduce cloud costs, improve performance,
            and scale your infrastructure efficiently.
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
      </div>

      {/* =========================
          ARTICLES SECTION
      ========================= */}

      <section className="articles-section">
        <h2 className="articles-title">
          Latest Cloud Optimization Insights
        </h2>

        <div className="articles-grid">
          <div className="article-card">
            <h3>How Companies Reduce Cloud Spend by 30%</h3>
            <p>
              Learn practical strategies businesses use to eliminate waste
              and optimize infrastructure efficiently.
            </p>
            <Link to="/article/reduce-cloud-spend">Read More →</Link>
          </div>

          <div className="article-card">
            <h3>Auto Scaling vs Fixed Servers</h3>
            <p>
              Understand when auto scaling saves money and when fixed
              infrastructure makes more sense.
            </p>
            <Link to="/article/auto-scaling-vs-fixed">Read More →</Link>
          </div>

          <div className="article-card">
            <h3>Reserved Instances Explained</h3>
            <p>
              A simple breakdown of how reserved instances can drastically
              reduce long-term cloud costs.
            </p>
            <Link to="/article/reserved-instances">Read More →</Link>
          </div>

          <div className="article-card">
            <h3>Common Cloud Cost Mistakes</h3>
            <p>
              Avoid the most frequent errors companies make that silently
              increase monthly bills.
            </p>
            <Link to="/article/common-cloud-mistakes">Read More →</Link>
          </div>
        </div>
      </section>
    </>
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

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #020617, #0f172a)"
          : "linear-gradient(135deg, #fefefe, #f8fafc)",
        transition: "0.4s ease", 
      }}
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />

        {/* ✅ ARTICLE PAGE ROUTE (THIS WAS MISSING) */}
        <Route path="/article/:slug" element={<Article />} />

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

      <footer className="site-footer">
  © {new Date().getFullYear()} NIVAAR. All rights reserved. D'Cryptcode
</footer>

    </div>
  );
}

export default App;
