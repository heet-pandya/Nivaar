import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import heroSymbol from "./assets/images (1).png";

import Navbar from "./components/Navbar";
import Questionnaire from "./pages/Questionnaire";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import "./App.css";



const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};


function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}



function Home({ darkMode }) {
  return (
    <div className="hero-container">

      {/* Sanskrit styled background N */}
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

        <Route path="/" element={<Home darkMode={darkMode} />} />

  <Route path="/login" element={<Login darkMode={darkMode} />} />
  <Route path="/register" element={<Register darkMode={darkMode} />} />

  <Route
    path="/questionnaire"
    element={
      localStorage.getItem("token") 
        ? (
          <Questionnaire
            darkMode={darkMode}
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        )
        : (
          <Navigate to="/login" />
        )
    }
  />

  <Route
    path="/dashboard"
    element={
      localStorage.getItem("token") 
        ? (
          <Dashboard
            darkMode={darkMode}
            companyData={companyData}
          />
        )
        : (
          <Navigate to="/login" />
        )
    }
  />

      </Routes>
    </div>
  );
}

export default App;




