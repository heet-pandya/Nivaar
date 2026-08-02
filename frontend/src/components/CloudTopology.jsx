import { useState } from "react";

export default function CloudTopology({ companyData }) {
  const [selectedNode, setSelectedNode] = useState(null);

  // Read actual client values or fallback to default mocks
  const provider = companyData?.basics?.provider || "AWS";
  const numServers = parseInt(companyData?.infra?.compute) || 5;
  const storageSize = companyData?.infra?.storage || "200 GB";
  const status = companyData?.optimization?.status || "High Savings Potential";
  const hasSpikes = status.toLowerCase().includes("savings") || status.toLowerCase().includes("drift");

  const nodes = [
    {
      id: "gateway",
      x: 60,
      y: 125,
      label: "API Gateway",
      subText: "Active Traffic",
      type: "network",
      color: "#3b82f6",
      details: {
        status: "Optimal ✅",
        metrics: "99.99% Uptime",
        savings: "$0.00/mo (Fully Optimized)",
        action: "No action required. Scaled to traffic."
      }
    },
    {
      id: "balancer",
      x: 180,
      y: 125,
      label: "Load Balancer",
      subText: "Direct Routing",
      type: "network",
      color: "#6366f1",
      details: {
        status: "Optimal ✅",
        metrics: "Auto-Routing active",
        savings: "$0.00/mo (Optimal Sizing)",
        action: "Congestion monitoring active. Healthy latency."
      }
    },
    {
      id: "compute",
      x: 320,
      y: 70,
      label: `${provider} Compute (EC2)`,
      subText: `${numServers} Servers Active`,
      type: "compute",
      color: hasSpikes ? "#ef4444" : "#10b981", // RED if high savings potential, green otherwise
      isProblem: hasSpikes,
      details: {
        status: hasSpikes ? "⚠️ OVERPROVISIONED" : "Optimal ✅",
        metrics: `Avg CPU utilization: 8.5% (Low)`,
        savings: hasSpikes ? `$${Math.round((companyData?.optimization?.savings || 350) * 0.6)}/mo` : "$0.00/mo",
        action: hasSpikes 
          ? "Scale down 3 server instances immediately to meet baseline usage." 
          : "Servers are well provisioned for current traffic load."
      }
    },
    {
      id: "database",
      x: 480,
      y: 70,
      label: "Managed Database",
      subText: "Postgres Cluster",
      type: "database",
      color: "#8b5cf6",
      details: {
        status: "Healthy ✅",
        metrics: "Read replica active",
        savings: "$0.00/mo (Managed)",
        action: "Database density optimized. Supabase instance active."
      }
    },
    {
      id: "storage",
      x: 400,
      y: 180,
      label: "Storage S3/Glacier",
      subText: `${storageSize} Object Files`,
      type: "storage",
      color: hasSpikes ? "#facc15" : "#10b981",
      isWarning: hasSpikes,
      details: {
        status: hasSpikes ? "⚠️ Drift Warning" : "Optimal ✅",
        metrics: "Archive tier unused",
        savings: hasSpikes ? `$${Math.round((companyData?.optimization?.savings || 350) * 0.2)}/mo` : "$0.00/mo",
        action: hasSpikes 
          ? "Move 60 days old stale storage buckets to cheaper Glacier Archive tier." 
          : "Storage tiers optimized."
      }
    }
  ];

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(30, 41, 59, 0.4)",
        backdropFilter: "blur(12px)",
        borderRadius: "18px",
        padding: "25px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "white",
        marginBottom: "35px",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            🕸️ Live Infrastructure Topology Visualizer
          </h3>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
            Interactive cloud architecture map. Click nodes to view real-time utilization profiles and recommendations.
          </p>
        </div>
        <div style={{ display: "flex", gap: "15px", fontSize: "12px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span> Optimized
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 1.5s infinite" }}></span> Waste Detected
          </span>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 560 250" style={{ width: "100%", height: "auto", overflow: "visible" }}>
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a16207" stopOpacity="0.8" />
            </linearGradient>

            <style>
              {`
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 0.8; }
                  50% { transform: scale(1.6); opacity: 0; }
                  100% { transform: scale(1); opacity: 0.8; }
                }
                @keyframes dash {
                  to { stroke-dashoffset: -20; }
                }
                .flowing-cable {
                  stroke-dasharray: 5;
                  animation: dash 1s linear infinite;
                }
                .pulse-glow {
                  animation: pulse 2s infinite ease-in-out;
                  transform-origin: center;
                }
                .svg-node {
                  cursor: pointer;
                  transition: transform 0.2s ease;
                }
                .svg-node:hover {
                  transform: translateY(-3px);
                }
              `}
            </style>
          </defs>

          {/* NETWORKING CABLES (CONNECTIONS) */}
          <path d="M 60 125 L 180 125" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
          <path d="M 60 125 L 180 125" stroke="#3b82f6" strokeWidth="2" fill="none" className="flowing-cable" />

          <path d="M 180 125 Q 250 70 320 70" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
          <path d="M 180 125 Q 250 70 320 70" stroke="#6366f1" strokeWidth="2" fill="none" className="flowing-cable" />

          <path d="M 180 125 Q 290 180 400 180" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
          <path d="M 180 125 Q 290 180 400 180" stroke="#eab308" strokeWidth="2" fill="none" className="flowing-cable" />

          <path d="M 320 70 L 480 70" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
          <path d="M 320 70 L 480 70" stroke="#8b5cf6" strokeWidth="2" fill="none" className="flowing-cable" />

          {/* NODES DRAWING */}
          {nodes.map((node) => {
            let fillGrad = "url(#blueGrad)";
            if (node.id === "balancer") fillGrad = "url(#indigoGrad)";
            if (node.id === "database") fillGrad = "url(#purpleGrad)";
            if (node.id === "compute") fillGrad = node.isProblem ? "url(#redGrad)" : "url(#greenGrad)";
            if (node.id === "storage") fillGrad = node.isWarning ? "url(#yellowGrad)" : "url(#greenGrad)";

            return (
              <g 
                key={node.id} 
                className="svg-node" 
                onClick={() => setSelectedNode(node)}
                transform={`translate(0, 0)`}
              >
                {/* Glow ring if anomaly exists */}
                {(node.isProblem || node.isWarning) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="34"
                    fill={node.isProblem ? "rgba(239, 68, 68, 0.4)" : "rgba(234, 179, 8, 0.4)"}
                    className="pulse-glow"
                  />
                )}

                {/* Main Node Base */}
                <circle cx={node.x} cy={node.y} r="24" fill={fillGrad} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                {/* Node Icons (Symbols) */}
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  {node.id === "gateway" && "🌐"}
                  {node.id === "balancer" && "🔀"}
                  {node.id === "compute" && "💻"}
                  {node.id === "database" && "🗄️"}
                  {node.id === "storage" && "📦"}
                </text>

                {/* Node Text labels */}
                <text
                  x={node.x}
                  y={node.y + 40}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12px"
                  fontWeight="600"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 53}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10px"
                >
                  {node.subText}
                </text>
              </g>
            );
          })}
        </svg>

        {/* DETAILS OVERLAY (Pops up when node clicked) */}
        {selectedNode && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "85%",
              maxWidth: "380px",
              background: "rgba(15, 23, 42, 0.95)",
              border: `2px solid ${selectedNode.color}`,
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              zIndex: 100,
              fontSize: "14px",
              lineHeight: "1.5"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <strong style={{ fontSize: "16px", color: selectedNode.color }}>
                {selectedNode.label} Configuration
              </strong>
              <button
                onClick={() => setSelectedNode(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
              <div>
                <span style={{ color: "#94a3b8", fontSize: "11px", display: "block" }}>STATUS</span>
                <span style={{ fontWeight: "bold" }}>{selectedNode.details.status}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8", fontSize: "11px", display: "block" }}>UTILIZATION</span>
                <span style={{ fontWeight: "bold" }}>{selectedNode.details.metrics}</span>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "8px", marginBottom: "15px" }}>
              <span style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "3px" }}>RECOMMENDED ACTION</span>
              <span style={{ fontSize: "12px", color: "#f8fafc" }}>💡 {selectedNode.details.action}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ color: "#94a3b8", fontSize: "11px", display: "block" }}>EST. MONTHLY WASTAGE</span>
                <strong style={{ color: selectedNode.isProblem ? "#ef4444" : "white" }}>
                  {selectedNode.details.savings}
                </strong>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: selectedNode.color,
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
