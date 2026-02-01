import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ darkMode, toggleTheme }) {

  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Hamburger (mobile only) */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Brand */}
      <Link to="/" className="brand">
        NIVAAR
      </Link>

      {/* Links */}
      <div className={`nav-links ${open ? "show" : ""}`}>

        <Link to="/questionnaire" onClick={() => setOpen(false)}>
          Questionnaire
        </Link>

        <Link to="/dashboard" onClick={() => setOpen(false)}>
          Dashboard
        </Link>

        <Link to="/login" onClick={() => setOpen(false)}>
          Login
        </Link>

      </div>

    </nav>
  );
}
