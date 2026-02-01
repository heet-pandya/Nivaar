import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register({ darkMode }) {

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!companyName || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          companyName,
          email,
          password,
          role,
        }
      );

      console.log(res.data);

      alert("Company registered successfully 🚀");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: darkMode
      ? "rgba(15,23,42,0.9)"
      : "rgba(255,255,255,0.95)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    color: darkMode ? "white" : "#111827",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
    background: darkMode ? "#020617" : "white",
    color: darkMode ? "white" : "#111827",
    fontSize: "15px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "white",
    boxShadow: "0 15px 30px rgba(79,70,229,0.4)",
    transition: "0.3s ease",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
          Create Business Account
        </h2>

        <p
          style={{
            color: darkMode ? "#9ca3af" : "#6b7280",
            marginBottom: "30px",
          }}
        >
          Start optimizing your company’s cloud infrastructure
        </p>

        <input
          type="text"
          placeholder="Company Name"
          style={inputStyle}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Business Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          style={inputStyle}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Your Role</option>
          <option>Founder / Co-Founder</option>
          <option>CTO</option>
          <option>DevOps Engineer</option>
          <option>Software Engineer</option>
          <option>Cloud Architect</option>
          <option>Other</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={buttonStyle}
          onClick={handleRegister}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have a business account?{" "}
          <Link
            to="/login"
            style={{ color: "#6366f1", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
