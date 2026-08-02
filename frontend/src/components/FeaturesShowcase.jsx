import { useState } from "react";

export default function FeaturesShowcase({ darkMode }) {
  // Topology State
  const [selectedNode, setSelectedNode] = useState("compute");

  // AI What-If State
  const [computeSlider, setComputeSlider] = useState(40); // 0 to 100%
  const [databaseSlider, setDatabaseSlider] = useState(25); // 0 to 100%

  // Slack Simulation State
  const [slackStep, setSlackStep] = useState("alert"); // 'alert' | 'optimizing' | 'resolved'

  // Dynamic calculations for AI What-If Simulator
  const baselineCost = 15000;
  const computeSavings = (computeSlider / 100) * 6500; // max $6,500 compute savings
  const dbSavings = (databaseSlider / 100) * 3500; // max $3,500 db savings
  const totalSavings = Math.round(computeSavings + dbSavings);
  const projectedCost = baselineCost - totalSavings;
  const savingsPercent = Math.round((totalSavings / baselineCost) * 100);

  // Styles
  const sectionStyle = {
    padding: "100px 60px",
    background: darkMode ? "#020617" : "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box"
  };

  const headerContainerStyle = {
    maxWidth: "1200px",
    margin: "0 auto 60px auto",
    textAlign: "center"
  };

  const badgeStyle = {
    fontFamily: "'Oswald', sans-serif",
    fontSize: "12px",
    background: "rgba(99, 102, 241, 0.15)",
    color: "#6366f1",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "inline-block",
    marginBottom: "15px"
  };

  const gridStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "40px"
  };

  const cardStyle = {
    background: darkMode ? "rgba(15, 23, 42, 0.65)" : "#ffffff",
    border: darkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: darkMode ? "0 10px 30px -10px rgba(0,0,0,0.5)" : "0 10px 30px -10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden"
  };

  const playBadgeStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "11px",
    background: "#10b981",
    color: "#ffffff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: "0.5px"
  };

  return (
    <section style={sectionStyle}>
      {/* Background glow effects */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "400px",
        height: "400px",
        background: "rgba(99, 102, 241, 0.04)",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "10%",
        width: "500px",
        height: "500px",
        background: "rgba(16, 185, 129, 0.03)",
        borderRadius: "50%",
        filter: "blur(100px)",
        pointerEvents: "none"
      }} />

      {/* SECTION HEADER */}
      <div style={headerContainerStyle}>
        <span style={badgeStyle}>INTERACTIVE DEMO ROOM</span>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "52px",
          color: darkMode ? "#ffffff" : "#0f172a",
          letterSpacing: "1.5px",
          margin: "0 0 15px 0",
          lineHeight: "1"
        }}>
          TEST DRIVE THE NIVAAR COCKPIT
        </h2>
        <p style={{
          fontSize: "16px",
          color: darkMode ? "#94a3b8" : "#64748b",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          Explore live previews of our core enterprise modules. Click elements, slide cost parameters, and witness AI-driven budget optimization in real-time.
        </p>
      </div>

      {/* THREE MODULE PLAYGROUND GRID */}
      <div style={gridStyle}>

        {/* CARD 1: TOPOLOGY PLAYGROUND */}
        <div style={cardStyle}>
          <span style={playBadgeStyle}>LIVE INTERACTIVE</span>
          <div>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px", color: darkMode ? "#fff" : "#0f172a", margin: "0 0 8px 0" }}>
              1. Cloud Topology Explorer
            </h3>
            <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b", margin: 0 }}>
              Visualizes real-time nodes and connections. Click a glowing cluster to inspect savings metrics.
            </p>
          </div>

          {/* SVG PLAYGROUND SCREEN */}
          <div style={{
            background: darkMode ? "#020617" : "#f1f5f9",
            borderRadius: "16px",
            height: "220px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: darkMode ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden"
          }}>
            <svg width="100%" height="100%" viewBox="0 0 400 220" style={{ position: "absolute" }}>
              {/* Pulsing Animated Connections */}
              <line x1="80" y1="110" x2="200" y2="60" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" style={{ animation: "dash 15s linear infinite" }} />
              <line x1="80" y1="110" x2="200" y2="160" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" style={{ animation: "dash 15s linear infinite" }} />
              <line x1="200" y1="60" x2="320" y2="110" stroke={selectedNode === "compute" ? "#f59e0b" : "#10b981"} strokeWidth="2" />
              <line x1="200" y1="160" x2="320" y2="110" stroke="#10b981" strokeWidth="2" />

              {/* Node 1: API Gateway (Public entrance) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedNode("gateway")}>
                <circle cx="80" cy="110" r="18" fill={selectedNode === "gateway" ? "#6366f1" : "rgba(99, 102, 241, 0.2)"} stroke="#6366f1" strokeWidth="2" />
                <text x="80" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">API</text>
              </g>

              {/* Node 2: EC2 Compute Cluster (Spiking / Warn) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedNode("compute")}>
                <circle cx="200" cy="60" r="22" fill={selectedNode === "compute" ? "#ef4444" : "rgba(239, 68, 68, 0.2)"} stroke="#ef4444" strokeWidth="2" style={{ animation: "pulseGlow 2s infinite" }} />
                <text x="200" y="64" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">EC2</text>
              </g>

              {/* Node 3: Cache Node */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedNode("cache")}>
                <circle cx="200" cy="160" r="18" fill={selectedNode === "cache" ? "#10b981" : "rgba(16, 185, 129, 0.2)"} stroke="#10b981" strokeWidth="2" />
                <text x="200" y="164" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">RDC</text>
              </g>

              {/* Node 4: DB Storage Database (Supabase) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedNode("database")}>
                <circle cx="320" cy="110" r="20" fill={selectedNode === "database" ? "#3b82f6" : "rgba(59, 130, 246, 0.2)"} stroke="#3b82f6" strokeWidth="2" />
                <text x="320" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">DB</text>
              </g>
            </svg>

            {/* Micro CSS styles for SVG animations */}
            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: -20; }
              }
              @keyframes pulseGlow {
                0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
              }
            `}</style>
          </div>

          {/* ACTIVE NODE DETAILS DETAILED */}
          <div style={{
            background: darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            borderRadius: "14px",
            padding: "15px 20px",
            fontSize: "12px",
            border: darkMode ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.03)"
          }}>
            {selectedNode === "gateway" && (
              <div>
                <strong style={{ color: "#6366f1", display: "block" }}>🛡️ PUBLIC ENTRY GATEWAY</strong>
                <div style={{ marginTop: "4px", color: darkMode ? "#94a3b8" : "#475569" }}>Status: <span style={{ color: "#10b981" }}>Healthy</span></div>
                <div style={{ color: darkMode ? "#94a3b8" : "#475569" }}>Throughput: 8,450 req/sec | Latency: 4ms</div>
              </div>
            )}
            {selectedNode === "compute" && (
              <div>
                <strong style={{ color: "#ef4444", display: "block" }}>🚨 EC2 AUTO-SCALING CLUSTER</strong>
                <div style={{ marginTop: "4px", color: darkMode ? "#94a3b8" : "#475569" }}>Status: <span style={{ color: "#ef4444" }}>Idle Waste Spiking (+210%)</span></div>
                <div style={{ color: darkMode ? "#94a3b8" : "#475569" }}>Potential Savings: <strong style={{ color: "#10b981" }}>$150.00 / day</strong> (72% Scale reduction possible)</div>
              </div>
            )}
            {selectedNode === "cache" && (
              <div>
                <strong style={{ color: "#10b981", display: "block" }}>⚡ REDIS MEMCACHED TIER</strong>
                <div style={{ marginTop: "4px", color: darkMode ? "#94a3b8" : "#475569" }}>Status: <span style={{ color: "#10b981" }}>Optimal Cache Hit Ratio (98.2%)</span></div>
                <div style={{ color: darkMode ? "#94a3b8" : "#475569" }}>Spend: $4.20 / day | Hit Rate: 98.2%</div>
              </div>
            )}
            {selectedNode === "database" && (
              <div>
                <strong style={{ color: "#3b82f6", display: "block" }}>📦 SUPABASE CLUSTER INSTANCE</strong>
                <div style={{ marginTop: "4px", color: darkMode ? "#94a3b8" : "#475569" }}>Status: <span style={{ color: "#10b981" }}>Fully Migrated (MongoDB Removed)</span></div>
                <div style={{ color: darkMode ? "#94a3b8" : "#475569" }}>Connections: Active | Query performance: 12ms average</div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 2: AI WHAT-IF SIMULATOR */}
        <div style={cardStyle}>
          <span style={playBadgeStyle}>AI POWERED</span>
          <div>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px", color: darkMode ? "#fff" : "#0f172a", margin: "0 0 8px 0" }}>
              2. "What-If" Ingestion Simulator
            </h3>
            <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b", margin: 0 }}>
              Adjust optimization metrics to calculate instant projected spend and ROI.
            </p>
          </div>

          {/* SLIDERS AND BARS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Slider A */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                <span>SHRINK IDLE CPU AUTO-SCALE</span>
                <strong style={{ color: "#6366f1" }}>{computeSlider}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={computeSlider}
                onChange={(e) => setComputeSlider(Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer", accentColor: "#6366f1" }}
              />
            </div>

            {/* Slider B */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                <span>RESERVED DB INSTANCE RATE</span>
                <strong style={{ color: "#6366f1" }}>{databaseSlider}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={databaseSlider}
                onChange={(e) => setDatabaseSlider(Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer", accentColor: "#6366f1" }}
              />
            </div>

            {/* VISUAL BILL COMPARISON BAR */}
            <div style={{
              background: darkMode ? "#020617" : "#f1f5f9",
              padding: "15px 20px",
              borderRadius: "16px",
              border: darkMode ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: darkMode ? "#94a3b8" : "#64748b", marginBottom: "6px" }}>
                <span>PROJECTED MONTHLY BILL</span>
                <span>SAVED {savingsPercent}%</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", fontFamily: "'Oswald', sans-serif" }}>
                ${projectedCost.toLocaleString()} <span style={{ fontSize: "12px", color: darkMode ? "#94a3b8" : "#64748b", textDecoration: "line-through", fontWeight: "normal", marginLeft: "10px" }}>$15,000</span>
              </div>
              <div style={{
                height: "8px",
                width: "100%",
                background: darkMode ? "#1e293b" : "#cbd5e1",
                borderRadius: "4px",
                marginTop: "12px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${100 - savingsPercent}%`,
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  transition: "width 0.15s ease-out"
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: SLACK ALERTS SIMULATOR */}
        <div style={cardStyle}>
          <span style={playBadgeStyle}>ALERTS INTERACTIVE</span>
          <div>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "20px", color: darkMode ? "#fff" : "#0f172a", margin: "0 0 8px 0" }}>
              3. Slack Alert Threat Resolver
            </h3>
            <p style={{ fontSize: "13px", color: darkMode ? "#94a3b8" : "#64748b", margin: 0 }}>
              Trigger alert routing from your clusters. Press the solve button to dispatch optimization commands.
            </p>
          </div>

          {/* SLACK MOCKUP SCREEN */}
          <div style={{
            background: "#1e1e24", // Dark Slate Slack Style
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.05)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#ffffff"
          }}>
            {/* Header */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "12px", fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "16px" }}>💬</span> <strong>#cloud-cost-alerts</strong>
            </div>

            {/* Slack message content */}
            {slackStep === "alert" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ borderLeft: "4px solid #ef4444", paddingLeft: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#f43f5e", marginBottom: "4px" }}>
                    🚨 NIVAAR COST WARNING DETECTED
                  </div>
                  <div style={{ fontSize: "11px", color: "#e2e8f0", lineHeight: "1.4" }}>
                    An unexpected budget spike occurred on your <strong>EC2 cluster</strong>. Idle resources are drawing $120.00/hour over threshold targets.
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSlackStep("optimizing");
                    setTimeout(() => {
                      setSlackStep("resolved");
                    }, 2000);
                  }}
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #4f46e5)",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    padding: "8px 12px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "inline-block",
                    alignSelf: "flex-start",
                    boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)"
                  }}
                >
                  Solve Spikes with Nivaar AI ⚡
                </button>
              </div>
            )}

            {slackStep === "optimizing" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "10px 0" }}>
                <div style={{
                  width: "24px",
                  height: "24px",
                  border: "3px solid rgba(99, 102, 241, 0.2)",
                  borderTop: "3px solid #6366f1",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                <div style={{ fontSize: "12px", color: "#e2e8f0" }}>Analyzing metrics & adjusting auto-scaling clusters...</div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {slackStep === "resolved" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ borderLeft: "4px solid #10b981", paddingLeft: "12px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                    ✅ COST ANOMALY RESOLVED BY NIVAAR
                  </div>
                  <div style={{ fontSize: "11px", color: "#e2e8f0", lineHeight: "1.4" }}>
                    Idle cluster sizes downscaled automatically from 12 instances to 3 instances. CPU utilization normalized to 78%.
                  </div>
                  <div style={{ fontSize: "11px", color: "#34d399", fontWeight: "bold", marginTop: "4px" }}>
                    🔥 Monthly Cloud Savings Locked: $2,880.00
                  </div>
                </div>
                <button
                  onClick={() => setSlackStep("alert")}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    color: "#94a3b8",
                    padding: "6px 12px",
                    fontSize: "11px",
                    cursor: "pointer",
                    alignSelf: "flex-start"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
                >
                  Reset Demo Ingestion
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
