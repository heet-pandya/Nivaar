import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer({ darkMode }) {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'pricing' | 'api' | 'docs' | 'contact' | 'about' | 'careers' | 'security'
  const [billingPeriod, setBillingPeriod] = useState("annual"); // 'monthly' | 'annual'
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [docSearch, setDocSearch] = useState("");

  const footerStyle = {
    background: darkMode ? "rgba(15, 23, 42, 0.95)" : "#ffffff",
    borderTop: darkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
    padding: "80px 60px 40px 60px",
    color: darkMode ? "#94a3b8" : "#475569",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    zIndex: 10,
    position: "relative"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "50px",
    marginBottom: "60px"
  };

  const brandColumnStyle = {
    gridColumn: "span 2",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  };

  const headingStyle = {
    fontFamily: "'Oswald', sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: darkMode ? "#ffffff" : "#0f172a",
    marginBottom: "20px"
  };

  const linkListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  };

  const linkStyle = {
    color: darkMode ? "#94a3b8" : "#475569",
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer"
  };

  const handleProductRedirect = (sectionId) => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (isLoggedIn) {
      navigate("/dashboard");
      // Give a tiny timeout for route change to finish, then scroll if section is provided
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate("/login");
    }
  };

  const handleBlogScroll = () => {
    const el = document.getElementById("articles-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we are not on Home page, navigate home first, then scroll
      navigate("/");
      setTimeout(() => {
        const homeEl = document.getElementById("articles-section");
        if (homeEl) homeEl.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setContactSubmitted(false);
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* BRAND SECTION */}
        <div style={brandColumnStyle}>
          <a 
            href="/"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "36px",
              color: darkMode ? "#ffffff" : "#0f172a",
              textDecoration: "none",
              letterSpacing: "1.5px",
              lineHeight: "1"
            }}
          >
            NIVAAR
          </a>
          <p style={{ maxWidth: "280px", margin: 0, fontSize: "14px", color: darkMode ? "#94a3b8" : "#64748b" }}>
            An intelligent, multi-tenant FinOps engine analyzing anomalies, topology networks, and AWS metrics to slash cloud waste.
          </p>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px", fontSize: "18px" }}>
            <span style={{ cursor: "pointer" }} title="Twitter">🐦</span>
            <span style={{ cursor: "pointer" }} title="LinkedIn">💼</span>
            <span style={{ cursor: "pointer" }} title="GitHub">💻</span>
          </div>
        </div>

        {/* COLUMN 1: PRODUCT */}
        <div>
          <h4 style={headingStyle}>Product</h4>
          <ul style={linkListStyle}>
            <li><span style={linkStyle} onClick={() => handleProductRedirect("topology-section")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Features</span></li>
            <li><span style={linkStyle} onClick={() => handleProductRedirect("whatif-section")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>What-If Simulator</span></li>
            <li><span style={linkStyle} onClick={() => handleProductRedirect("slack-section")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Integrations Hub</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("pricing")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Pricing Plans</span></li>
          </ul>
        </div>

        {/* COLUMN 2: RESOURCES */}
        <div>
          <h4 style={headingStyle}>Resources</h4>
          <ul style={linkListStyle}>
            <li><span style={linkStyle} onClick={() => setActiveModal("docs")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Documentation</span></li>
            <li><span style={linkStyle} onClick={handleBlogScroll} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Insights Blog</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("docs")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>FinOps Guide</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("api")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>API Reference</span></li>
          </ul>
        </div>

        {/* COLUMN 3: COMPANY */}
        <div>
          <h4 style={headingStyle}>Company</h4>
          <ul style={linkListStyle}>
            <li><span style={linkStyle} onClick={() => setActiveModal("about")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>About Us</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("careers")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Careers</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("security")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Security</span></li>
            <li><span style={linkStyle} onClick={() => setActiveModal("contact")} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Contact Sales</span></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM FOOTER BAR */}
      <div 
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderTop: darkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          fontSize: "12px",
          color: darkMode ? "#64748b" : "#94a3b8"
        }}
      >
        <span>© {new Date().getFullYear()} NIVAAR Technologies Inc. Designed & Engineered by DCrypt Code. All rights reserved.</span>
        <div style={{ display: "flex", gap: "25px" }}>
          <span style={{ cursor: "pointer" }} onClick={() => setActiveModal("security")}>Privacy Policy</span>
          <span style={{ cursor: "pointer" }} onClick={() => setActiveModal("security")}>Terms of Service</span>
          <span style={{ cursor: "pointer" }} onClick={() => setActiveModal("security")}>Trust & GDPR</span>
        </div>
      </div>

      {/* ==================== INTERACTIVE SaaS PORTALS & MODALS ==================== */}
      {activeModal && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(2, 6, 23, 0.7)",
            backdropFilter: "blur(12px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: darkMode ? "linear-gradient(135deg, #0f172a, #1e293b)" : "#ffffff",
              border: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0,0,0,0.08)",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              width: "100%",
              maxWidth: activeModal === "docs" || activeModal === "pricing" ? "1000px" : "600px",
              maxHeight: "85vh",
              overflowY: "auto",
              position: "relative",
              padding: "40px",
              color: darkMode ? "#f8fafc" : "#0f172a"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "24px",
                color: darkMode ? "#94a3b8" : "#64748b",
                cursor: "pointer",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "#ef4444"}
              onMouseLeave={(e) => e.target.style.color = ""}
            >
              ✕
            </button>

            {/* 1. PRICING MODAL */}
            {activeModal === "pricing" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  NIVAAR SUBSCRIPTION PRICING
                </h2>
                <p style={{ color: darkMode ? "#94a3b8" : "#64748b", margin: "0 0 25px 0" }}>
                  Scale optimization, configure real-time alert spikes, and get full visual topologies for your business.
                </p>

                {/* MONTHLY / ANNUAL TOGGLE */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginBottom: "35px" }}>
                  <span style={{ fontWeight: billingPeriod === "monthly" ? "bold" : "normal", color: billingPeriod === "monthly" ? "#6366f1" : "" }}>Monthly</span>
                  <div 
                    onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                    style={{
                      width: "60px",
                      height: "30px",
                      borderRadius: "15px",
                      backgroundColor: "#6366f1",
                      position: "relative",
                      cursor: "pointer",
                      padding: "2px"
                    }}
                  >
                    <div 
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        position: "absolute",
                        left: billingPeriod === "monthly" ? "2px" : "32px",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      }}
                    />
                  </div>
                  <span style={{ fontWeight: billingPeriod === "annual" ? "bold" : "normal", color: billingPeriod === "annual" ? "#6366f1" : "" }}>
                    Annually <span style={{ fontSize: "11px", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "2px 8px", borderRadius: "10px", marginLeft: "5px" }}>SAVE 20%</span>
                  </span>
                </div>

                {/* CARDS GRID */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                  
                  {/* TIER 1 */}
                  <div style={{
                    padding: "30px",
                    borderRadius: "16px",
                    border: darkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
                    background: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"
                  }}>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px" }}>DEVELOPER</h3>
                    <div style={{ fontSize: "36px", fontWeight: "bold", margin: "15px 0" }}>$0</div>
                    <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b" }}>Perfect for developers seeking general analytics and minor cost analysis.</p>
                    <hr style={{ border: "none", borderTop: "1px solid rgba(128,128,128,0.2)", margin: "20px 0" }} />
                    <ul style={{ paddingLeft: "18px", fontSize: "13px", lineHeight: "2" }}>
                      <li>1 Cloud Account Integration</li>
                      <li>Daily Cost Metric Pulls</li>
                      <li>Basic Anomalies Ledger</li>
                      <li>Community Discord Support</li>
                    </ul>
                    <button onClick={closeModal} style={{ width: "100%", padding: "12px", borderRadius: "10px", marginTop: "25px", border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontFamily: "'Oswald', sans-serif" }}>
                      START FREE
                    </button>
                  </div>

                  {/* TIER 2 (RECOMMENDED GLOW) */}
                  <div style={{
                    padding: "30px",
                    borderRadius: "16px",
                    border: "2px solid #6366f1",
                    position: "relative",
                    background: darkMode ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.02)",
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.15)"
                  }}>
                    <span style={{ position: "absolute", top: "-13px", right: "20px", background: "#6366f1", color: "#fff", fontSize: "11px", padding: "4px 10px", borderRadius: "20px", fontWeight: "bold" }}>POPULAR PLAN</span>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px", color: "#6366f1" }}>FINOPS GROWTH</h3>
                    <div style={{ fontSize: "36px", fontWeight: "bold", margin: "15px 0" }}>
                      ${billingPeriod === "monthly" ? "99" : "79"}<span style={{ fontSize: "14px", fontWeight: "normal" }}>/mo</span>
                    </div>
                    <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b" }}>Comprehensive multi-cloud visual networks, anomaly webhooks, and AI advisors.</p>
                    <hr style={{ border: "none", borderTop: "1px solid rgba(128,128,128,0.2)", margin: "20px 0" }} />
                    <ul style={{ paddingLeft: "18px", fontSize: "13px", lineHeight: "2" }}>
                      <li>Up to 5 Connected Accounts</li>
                      <li>Hourly Metric Syncing</li>
                      <li><strong>Interactive Topology Network</strong></li>
                      <li><strong>AI What-If Simulator Sliders</strong></li>
                      <li><strong>Instant Slack Webhook Logs</strong></li>
                      <li>Priority Email/Chat Support (24hr SLA)</li>
                    </ul>
                    <button onClick={closeModal} style={{ width: "100%", padding: "12px", borderRadius: "10px", marginTop: "25px", border: "none", background: "linear-gradient(90deg, #6366f1, #4f46e5)", color: "#fff", cursor: "pointer", fontFamily: "'Oswald', sans-serif", boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)" }}>
                      UPGRADE NOW ⚡
                    </button>
                  </div>

                  {/* TIER 3 */}
                  <div style={{
                    padding: "30px",
                    borderRadius: "16px",
                    border: darkMode ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
                    background: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"
                  }}>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px" }}>ENTERPRISE</h3>
                    <div style={{ fontSize: "36px", fontWeight: "bold", margin: "15px 0" }}>
                      ${billingPeriod === "monthly" ? "499" : "399"}<span style={{ fontSize: "14px", fontWeight: "normal" }}>/mo</span>
                    </div>
                    <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b" }}>Full SOC2 data retention, customized API thresholds, and custom cluster scans.</p>
                    <hr style={{ border: "none", borderTop: "1px solid rgba(128,128,128,0.2)", margin: "20px 0" }} />
                    <ul style={{ paddingLeft: "18px", fontSize: "13px", lineHeight: "2" }}>
                      <li>Unlimited Cloud Provider Accounts</li>
                      <li>Real-time Live Scanning</li>
                      <li>Custom Dashboards & SSO Login</li>
                      <li>Dedicated Solutions Architect</li>
                      <li>SOC2 Data Storage & Vaulting</li>
                      <li>API Access & Custom CI Integrations</li>
                    </ul>
                    <button onClick={() => setActiveModal("contact")} style={{ width: "100%", padding: "12px", borderRadius: "10px", marginTop: "25px", border: "none", background: darkMode ? "#334155" : "#e2e8f0", color: darkMode ? "#fff" : "#0f172a", cursor: "pointer", fontFamily: "'Oswald', sans-serif" }}>
                      TALK TO SALES
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* 2. API REFERENCE MODAL */}
            {activeModal === "api" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  API REFERENCE & METRIC UPLOAD
                </h2>
                <p style={{ color: darkMode ? "#94a3b8" : "#64748b", marginBottom: "25px" }}>
                  Inject your own telemetry or pull real-time anomaly spikes programmatically from Nivaar.
                </p>

                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#6366f1", marginBottom: "10px" }}>1. AUTHENTICATE YOUR REQUESTS</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.5" }}>Generate a private key in settings and append it as a Bearer authorization token:</p>
                <div style={{ background: "#020617", padding: "15px", borderRadius: "10px", fontFamily: "monospace", fontSize: "12px", color: "#10b981", margin: "10px 0 20px 0", border: "1px solid rgba(255,255,255,0.05)" }}>
                  Authorization: Bearer nivaar_live_8f3d1b827e8a93ac
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#6366f1", marginBottom: "10px" }}>2. GET LATEST ANOMALIES (GET)</h3>
                <div style={{ background: "#020617", padding: "15px", borderRadius: "10px", fontFamily: "monospace", fontSize: "12px", color: "#e2e8f0", margin: "10px 0 25px 0", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: "#f43f5e", fontWeight: "bold" }}>GET</span> https://api.nivaar.io/v1/anomalies?limit=5
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#6366f1", marginBottom: "10px" }}>3. PUSH CUSTOM INGESTION DATA (CURL EXAMPLE)</h3>
                <pre style={{
                  background: "#020617",
                  padding: "20px",
                  borderRadius: "12px",
                  overflowX: "auto",
                  fontSize: "12px",
                  color: "#34d399",
                  border: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "monospace",
                  lineHeight: "1.6"
                }}>
{`curl -X POST https://api.nivaar.io/v1/telemetry \\
  -H "Authorization: Bearer nivaar_live_8f3d1b827e8a93c" \\
  -H "Content-Type: application/json" \\
  -d '{
    "companyId": "comp_91823",
    "metrics": {
      "unoptimized": 12850.50,
      "optimized": 3400.12,
      "cpuUsagePercent": 42.8
    }
  }'`}
                </pre>
              </div>
            )}

            {/* 3. DOCUMENTATION & FINOPS GUIDE MODAL */}
            {activeModal === "docs" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  NIVAAR DOCUMENTATION HUB
                </h2>
                <p style={{ color: darkMode ? "#94a3b8" : "#64748b", margin: "0 0 20px 0" }}>
                  Everything you need to set up real-time monitoring, anomaly webhooks, and cost topologies.
                </p>

                {/* SEARCH MOCK */}
                <input 
                  type="text" 
                  placeholder="Search articles, guides, webhooks..." 
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
                    background: darkMode ? "#020617" : "#f1f5f9",
                    color: darkMode ? "#fff" : "#0f172a",
                    marginBottom: "30px",
                    outline: "none"
                  }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "30px" }}>
                  {/* SIDE NAVIGATION */}
                  <div style={{ borderRight: "1px solid rgba(128,128,128,0.2)", paddingRight: "20px" }}>
                    <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "#6366f1", marginBottom: "15px" }}>GETTING STARTED</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                      <li style={{ fontWeight: "bold", color: "#6366f1", cursor: "pointer" }}>1. Introduction</li>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>2. Connecting Supabase</li>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>3. Core Dashboard metrics</li>
                    </ul>

                    <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "#6366f1", margin: "25px 0 15px 0" }}>CORE CONCEPTS</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Topology Clusters</li>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Cost Spike Detection</li>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Slack Integrations</li>
                      <li style={{ cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#6366f1"} onMouseLeave={(e) => e.target.style.color = ""}>Gamification Badges</li>
                    </ul>
                  </div>

                  {/* CONTENT SCREEN */}
                  <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Welcome to Nivaar's FinOps Optimization Engine</h3>
                    <p style={{ fontSize: "14px", lineHeight: "1.7", color: darkMode ? "#94a3b8" : "#475569" }}>
                      Nivaar serves as a next-generation Cloud FinOps control panel. Traditional cloud portals dump millions of lines of CSV data on you. Nivaar translates those complex assets into an interactive <strong>Visual Topology Cluster Map</strong> and filters key abnormalities using our custom background scanners.
                    </p>

                    <div style={{ background: darkMode ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)", padding: "20px", borderRadius: "12px", border: "1px dashed rgba(99,102,241,0.3)", marginTop: "20px" }}>
                      <h4 style={{ color: "#6366f1", marginTop: 0, fontSize: "14px" }}>💡 Quick Tip: Linking Slack Alerts</h4>
                      <p style={{ fontSize: "13px", margin: 0, lineHeight: "1.6", color: darkMode ? "#94a3b8" : "#475569" }}>
                        Enter an incoming webhook URL into the Integrations settings of your Dashboard. Once connected, Nivaar will automatically dispatch visual slack cards detailing optimization savings and budget thresholds.
                      </p>
                    </div>

                    <h4 style={{ fontSize: "16px", marginTop: "25px" }}>Next Steps:</h4>
                    <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#475569" }}>
                      Follow the sidebar tutorials to configure credentials for AWS, pull telemetry via curl, or utilize the interactive AI sliders inside the main dashboard view.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CONTACT SALES MODAL */}
            {activeModal === "contact" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  TALK TO A FINOPS ADVISOR
                </h2>
                <p style={{ color: darkMode ? "#94a3b8" : "#64748b", marginBottom: "25px" }}>
                  Interested in setting up custom infrastructure scopes? Drop us a line and let's get you set up.
                </p>

                {contactSubmitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: "48px", marginBottom: "15px" }}>✉️</div>
                    <h3 style={{ fontSize: "20px", color: "#10b981" }}>MESSAGE DISPATCHED SECURELY</h3>
                    <p style={{ fontSize: "14px", color: darkMode ? "#94a3b8" : "#64748b", maxWidth: "400px", margin: "10px auto" }}>
                      Thank you! A Nivaar Solution Specialist will reach out to you within 2 business hours.
                    </p>
                    <button onClick={closeModal} style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", marginTop: "20px" }}>
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>FULL NAME</label>
                      <input required type="text" placeholder="John Doe" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)", background: darkMode ? "#020617" : "#f8fafc", color: darkMode ? "#fff" : "#000" }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>WORK EMAIL</label>
                        <input required type="email" placeholder="john@company.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)", background: darkMode ? "#020617" : "#f8fafc", color: darkMode ? "#fff" : "#000" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>COMPANY SIZE</label>
                        <select style={{ width: "100%", padding: "12px", borderRadius: "8px", border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)", background: darkMode ? "#020617" : "#f8fafc", color: darkMode ? "#fff" : "#000" }}>
                          <option>1-50 employees</option>
                          <option>51-200 employees</option>
                          <option>201-1000 employees</option>
                          <option>1000+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>HOW CAN WE HELP?</label>
                      <textarea required rows="4" placeholder="I am looking to integrate AWS and GCP cost analysis..." style={{ width: "100%", padding: "12px", borderRadius: "8px", border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)", background: darkMode ? "#020617" : "#f8fafc", color: darkMode ? "#fff" : "#000" }} />
                    </div>

                    <button type="submit" style={{ padding: "14px", border: "none", borderRadius: "10px", background: "linear-gradient(90deg, #6366f1, #4f46e5)", color: "#fff", cursor: "pointer", fontWeight: "bold", fontFamily: "'Oswald', sans-serif", letterSpacing: "1px", marginTop: "10px" }}>
                      SUBMIT REQUEST 🚀
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* 5. ABOUT MODAL */}
            {activeModal === "about" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  ABOUT NIVAAR
                </h2>
                <p style={{ color: "#6366f1", fontWeight: "bold", marginBottom: "20px" }}>
                  REVOLUTIONIZING THE FUTURE OF FINOPS
                </p>
                <div style={{ fontSize: "14px", lineHeight: "1.7", color: darkMode ? "#e2e8f0" : "#475569", display: "flex", flexDirection: "column", gap: "15px" }}>
                  <p>
                    Nivaar was founded with a single mission: to end cloud resource waste. Over <strong>$20 Billion</strong> is lost annually on idle AWS instances, unoptimized storage clusters, and excessive configuration overhead.
                  </p>
                  <p>
                    Our core engineers combined visual clustering algorithms with lightweight background telemetry scanners to build a complete SaaS cockpit. Nivaar scans your network infrastructure and builds visual graphs, pinpointing every unnecessary cost vector.
                  </p>
                  <p>
                    With offices in Silicon Valley and Bangalore, we support fast-growing startups and established tech teams in scaling their developer tools securely.
                  </p>
                </div>
              </div>
            )}

            {/* 6. CAREERS MODAL */}
            {activeModal === "careers" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  CAREERS AT NIVAAR
                </h2>
                <p style={{ color: "#6366f1", fontWeight: "bold", marginBottom: "20px" }}>
                  BUILD THE COCKPIT OF THE MULTI-CLOUD WORLD
                </p>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: darkMode ? "#94a3b8" : "#475569" }}>
                  We are a fully-remote, product-led team of cloud systems developers and FinOps educators. We value extreme ownership, visual beauty in developer platforms, and clean systems engineering.
                </p>

                <h3 style={{ fontSize: "14px", fontWeight: "bold", marginTop: "25px", marginBottom: "15px" }}>OPEN ROLES (REMOTELY ACTIVE)</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ padding: "15px", border: "1px solid rgba(128,128,128,0.2)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "14px" }}>Senior FinOps Systems Engineer</h4>
                      <span style={{ fontSize: "12px", color: darkMode ? "#94a3b8" : "#64748b" }}>Backend / Kubernetes / Golang</span>
                    </div>
                    <span onClick={() => { alert("Thank you! Please send your CV to careers@nivaar.io"); }} style={{ padding: "6px 12px", borderRadius: "6px", background: "#6366f1", color: "#fff", fontSize: "12px", cursor: "pointer" }}>Apply</span>
                  </div>

                  <div style={{ padding: "15px", border: "1px solid rgba(128,128,128,0.2)", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "14px" }}>Full-Stack Visual UI Engineer</h4>
                      <span style={{ fontSize: "12px", color: darkMode ? "#94a3b8" : "#64748b" }}>Frontend / SVG / React / D3.js</span>
                    </div>
                    <span onClick={() => { alert("Thank you! Please send your CV to careers@nivaar.io"); }} style={{ padding: "6px 12px", borderRadius: "6px", background: "#6366f1", color: "#fff", fontSize: "12px", cursor: "pointer" }}>Apply</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. SECURITY & SOC2 MODAL */}
            {activeModal === "security" && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", marginBottom: "5px" }}>
                  TRUST, SECURITY & COMPLIANCE
                </h2>
                <p style={{ color: "#6366f1", fontWeight: "bold", marginBottom: "20px" }}>
                  ENTERPRISE SECURITY BUILT IN BY DEFAULT
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
                  <div style={{ padding: "20px", background: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "32px", marginBottom: "5px" }}>🛡️</div>
                    <h4 style={{ margin: "5px 0" }}>SOC 2 TYPE II</h4>
                    <p style={{ fontSize: "12px", margin: 0, color: darkMode ? "#94a3b8" : "#64748b" }}>Fully audited pipelines for absolute isolation and logging controls.</p>
                  </div>
                  <div style={{ padding: "20px", background: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "32px", marginBottom: "5px" }}>🔒</div>
                    <h4 style={{ margin: "5px 0" }}>GDPR COMPLIANT</h4>
                    <p style={{ fontSize: "12px", margin: 0, color: darkMode ? "#94a3b8" : "#64748b" }}>Your keys, database profiles, and logs remain 100% within sandbox partitions.</p>
                  </div>
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "10px" }}>DATA ENCRYPTION</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: darkMode ? "#94a3b8" : "#475569" }}>
                  All telemetry is encrypted in transit using TLS 1.3 and at rest utilizing AES-256 standard encryption. Nivaar does not read raw payload values or sensitive credentials; we only analyze aggregated sizing metrics, cost counters, and infrastructure thresholds.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </footer>
  );
}
