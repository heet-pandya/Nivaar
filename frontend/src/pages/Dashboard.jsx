import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import CloudTopology from "../components/CloudTopology";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ darkMode, companyData }) {
  const [displayCurrency, setDisplayCurrency] = useState(companyData?.basics?.currency || "USD");
  const [awsData, setAwsData] = useState(null);
  const [loadingAWS, setLoadingAWS] = useState(true);

  // AI Architect Report State
  const [aiReport, setAiReport] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);

  // Integrations & Gamification Profile State
  const [badges, setBadges] = useState(["FinOps Explorer"]);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [testingSlack, setTestingSlack] = useState(false);

  // AI What-If Simulator State
  const [computeFootprint, setComputeFootprint] = useState(0);
  const [commitmentLevel, setCommitmentLevel] = useState("ondemand");
  const [dbMigration, setDbMigration] = useState("no");
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState("");

  const localCompany = JSON.parse(localStorage.getItem("company") || "{}");
  const companyId = localCompany.id;

  // FETCH INTEGRATION PROFILE (BADGES AND WEBHOOKS) ON BOOT
  useEffect(() => {
    if (companyId) {
      fetch(`http://localhost:5000/api/integrations/profile/${companyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.badges) setBadges(data.badges);
          if (data.slack_webhook) setSlackWebhook(data.slack_webhook);
        })
        .catch((err) => console.error("Failed to load integrations profile:", err));
    }
  }, [companyId]);

  // SAVE WEBHOOK TO DATABASE
  const handleSaveWebhook = async () => {
    if (!companyId) return;
    setSavingWebhook(true);
    try {
      const res = await fetch("http://localhost:5000/api/integrations/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, webhookUrl: slackWebhook }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Slack Webhook URL saved successfully! ✅");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      alert("Failed to save webhook URL: " + err.message);
    } finally {
      setSavingWebhook(false);
    }
  };

  // TRIGGER TEST ALREADY ANOMALY COST SPIKE TO SLACK
  const handleTestSlack = async () => {
    if (!companyId) return;
    if (!slackWebhook) {
      alert("Please enter and save a Slack Webhook URL first!");
      return;
    }
    setTestingSlack(true);
    try {
      const res = await fetch("http://localhost:5000/api/integrations/test-slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Cost Spike Alert dispatched successfully! Check your Slack channel. 🚀");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      alert("Failed to send alert: " + err.message);
    } finally {
      setTestingSlack(false);
    }
  };

  // RUN AI WHAT-IF SIMULATION
  const handleRunSimulation = async () => {
    setSimulating(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/simulate-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyData,
          simulationParameters: {
            computeFootprint,
            commitmentLevel,
            dbMigration,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSimulationResult(data.report);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      setSimulationResult("Failed to run scenario simulation.");
    } finally {
      setSimulating(false);
    }
  };

  const fetchAiReport = async () => {
    setGeneratingAI(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyData, awsData }),
      });
      const data = await res.json();
      setAiReport(data.report);
    } catch (err) {
      console.error("AI Generation Error", err);
      setAiReport("Failed to generate AI report.");
    } finally {
      setGeneratingAI(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/aws/billing")
      .then((res) => res.json())
      .then((data) => {
        setAwsData(data);
        setLoadingAWS(false);
      })
      .catch((err) => {
        console.error("Failed to fetch AWS Data", err);
        setLoadingAWS(false);
      });
  }, []);

  const toggleCurrency = () => {
    setDisplayCurrency((prev) => (prev === "USD" ? "INR" : "USD"));
  };

  const multiplier = displayCurrency === "INR" ? 83 : 1;

  const optimization = companyData.optimization || {
    currentSpend: 0,
    optimizedSpend: 0,
    savings: 0,
    recommendations: [],
    status: "",
  };

  const currentSpend = optimization.currentSpend * multiplier;
  const optimizedSpend = optimization.optimizedSpend * multiplier;
  const savings = optimization.savings * multiplier;
  const recommendations = optimization.recommendations || [];

  const format = (value) => {
    const absValue = Math.abs(value);
    return displayCurrency === "INR"
      ? `₹${absValue.toFixed(0)}`
      : `$${absValue.toFixed(0)}`;
  };

  const chartData = [
    { name: "Current", cost: currentSpend },
    { name: "Optimized", cost: optimizedSpend },
  ];

  const card = {
    background: darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    color: darkMode ? "white" : "#111827",
    border: darkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
  };

  // Badge list definitions
  const badgeDefinitions = [
    { id: "FinOps Explorer", title: "FinOps Explorer", icon: "🚀", desc: "Completed your first infrastructure analysis survey." },
    { id: "Zombie Slayer", title: "Zombie Slayer", icon: "🧟", desc: "Identified high-spend waste or terminated idle servers." },
    { id: "Auto-Scaling Dynamo", title: "Auto-Scaling Dynamo", icon: "⚡", desc: "Auto-scaling groups fully active on production clusters." },
    { id: "Reserved Committer", title: "Reserved Committer", icon: "🤝", desc: "Maximized savings via 1-yr/3-yr reserved commitments." },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>Cloud Optimization Dashboard</h1>
          <p style={{ margin: "5px 0 0 0", color: "#64748b" }}>Actionable cost engineering and system visualization insights.</p>
        </div>
        <button
          onClick={toggleCurrency}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)",
          }}
        >
          View in {displayCurrency === "USD" ? "INR" : "USD"}
        </button>
      </div>

      {/* METRICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <div style={card}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: "bold" }}>Current Spend</span>
          <h2 style={{ fontSize: "28px", margin: "10px 0", fontWeight: "700" }}>{format(currentSpend)}</h2>
          <span style={{ fontSize: "12px", color: "#10b981" }}>Active baseline</span>
        </div>

        <div style={card}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: "bold" }}>Optimized Spend</span>
          <h2 style={{ fontSize: "28px", margin: "10px 0", fontWeight: "700" }}>{format(optimizedSpend)}</h2>
          <span style={{ fontSize: "12px", color: "#6366f1" }}>Calculated targets</span>
        </div>

        <div style={card}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: "bold" }}>
            {savings < 0 ? "Investment Required" : "Estimated Savings"}
          </span>
          <h2 style={{ fontSize: "28px", margin: "10px 0", fontWeight: "700", color: savings < 0 ? "#ef4444" : "#10b981" }}>
            {savings < 0 ? "+" : ""}{format(savings)}
          </h2>
          <span style={{ fontSize: "12px", color: savings < 0 ? "#ef4444" : "#10b981" }}>
            {savings < 0 ? "Underprovisioning fixed" : "Wastage trimmed"}
          </span>
        </div>
      </div>

      {/* 🕸️ INFRASTRUCTURE TOPOLOGY GRAPH */}
      <CloudTopology companyData={companyData} />

      {/* 🎮 FINOPS GAMIFICATION (BADGES & LEADERBOARD WIDGET) */}
      <div style={{ ...card, marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", margin: "0 0 10px 0" }}>🎮 FinOps Optimization Badges</h2>
        <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" }}>
          Earn active badges by implementing cost-saving best practices. Can you unlock them all?
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {badgeDefinitions.map((b) => {
            const isUnlocked = badges.includes(b.id);
            return (
              <div
                key={b.id}
                style={{
                  background: isUnlocked ? "rgba(99, 102, 241, 0.08)" : "rgba(255,255,255,0.02)",
                  border: isUnlocked ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  gap: "15px",
                  alignItems: "flex-start",
                  opacity: isUnlocked ? 1 : 0.45,
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontSize: "32px", lineHeight: "1" }}>{b.icon}</div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", color: isUnlocked ? "#818cf8" : "white" }}>
                    {b.title} {isUnlocked ? "✅" : "🔒"}
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", lineHeight: "1.4" }}>{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN INTERACTION PANEL */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", marginBottom: "40px" }}>
        
        {/* AI WHAT-IF SIMULATOR */}
        <div style={card}>
          <h2 style={{ fontSize: "20px", margin: "0 0 6px 0" }}>🧪 AI "What-If" Cloud Simulator</h2>
          <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" }}>
            Model modifications and calculate potential cost impacts.
          </p>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>
              Resize Compute Footprint: {computeFootprint > 0 ? `+${computeFootprint}` : computeFootprint}%
            </label>
            <input
              type="range"
              min="-50"
              max="100"
              value={computeFootprint}
              onChange={(e) => setComputeFootprint(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#6366f1" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>
                Commitment Model
              </label>
              <select
                value={commitmentLevel}
                onChange={(e) => setCommitmentLevel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  background: darkMode ? "#0f172a" : "white",
                  color: darkMode ? "white" : "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <option value="ondemand">On-Demand (Normal)</option>
                <option value="reserved">Reserved Commitments (-32%)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px" }}>
                Database Migrations
              </label>
              <select
                value={dbMigration}
                onChange={(e) => setDbMigration(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  background: darkMode ? "#0f172a" : "white",
                  color: darkMode ? "white" : "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <option value="no">Keep Default</option>
                <option value="yes">Managed DBs (-15%)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={simulating}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {simulating ? "Simulating Scenario... ⏳" : "Run AI Simulation 🔮"}
          </button>

          {simulationResult && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "15px",
                borderRadius: "10px",
                maxHeight: "180px",
                overflowY: "auto",
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              <ReactMarkdown>{simulationResult}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* ALERTS & INTEGRATIONS SETTINGS */}
        <div style={card}>
          <h2 style={{ fontSize: "20px", margin: "0 0 6px 0" }}>🔌 Integrations & Slack Alerts</h2>
          <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" }}>
            Enable proactive Cost Spike and waste alerts directly in Slack.
          </p>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }}>
              Slack Webhook Incoming URL
            </label>
            <input
              type="text"
              placeholder="https://hooks.slack.com/services/..."
              value={slackWebhook}
              onChange={(e) => setSlackWebhook(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: darkMode ? "#0f172a" : "white",
                color: darkMode ? "white" : "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "13px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <button
              onClick={handleSaveWebhook}
              disabled={savingWebhook}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(255, 255, 255, 0.08)",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {savingWebhook ? "Saving... ⏳" : "Save Webhook"}
            </button>
            <button
              onClick={handleTestSlack}
              disabled={testingSlack}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#047857",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {testingSlack ? "Dispatching... ⏳" : "Test Alert 🚨"}
            </button>
          </div>

          <div style={{ marginTop: "25px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "15px" }}>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "13px" }}>💡 How does this work?</h4>
            <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: "1.5" }}>
              Creating a Slack incoming webhook forwards JSON-formatted messages directly to your channels. Our backend anomaly cron registers structural spikes and alerts engineers immediately!
            </p>
          </div>
        </div>

      </div>

      {/* LEGACY COST CHART & ORIGINAL DETAILS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
        
        {/* Live AWS Integration Status */}
        <div style={{ ...card, border: "2px solid #6366f1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "18px" }}>Live AWS Integration</h2>
            {loadingAWS && <span style={{ color: "#888", fontSize: "12px" }}>Fetching... ⏳</span>}
          </div>
          
          {!loadingAWS && awsData && (
            <div style={{ marginTop: "15px" }}>
              <p style={{ color: awsData.isMock ? "#facc15" : "#4ade80", fontWeight: "bold", fontSize: "12px", margin: "0 0 10px 0" }}>
                {awsData.isMock ? "⚠️ USING GRACEFUL MOCK (No credentials)" : "✅ LIVE PRODUCTION CONNECTION ACTIVE"}
              </p>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <div style={{ background: "rgba(99, 102, 241, 0.08)", padding: "15px", borderRadius: "10px", flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "11px", color: "#818cf8" }}>Current Spend</h4>
                  <h3 style={{ margin: 0 }}>{awsData.currency} {awsData.currentSpend.toFixed(2)}</h3>
                </div>
                <div style={{ background: "rgba(99, 102, 241, 0.08)", padding: "15px", borderRadius: "10px", flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "11px", color: "#818cf8" }}>Projected API Spend</h4>
                  <h3 style={{ margin: 0 }}>{awsData.currency} {awsData.predictedSpend.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cost Comparison Chart */}
        <div style={card}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Cost Comparison</h2>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
        
        {/* Legacy Infra summary */}
        <div style={card}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Infrastructure Summary</h2>
          <ul style={{ lineHeight: "2", fontSize: "13px", paddingLeft: "20px", margin: 0 }}>
            <li>Cloud Provider: {companyData?.basics?.provider || "N/A"}</li>
            <li>Company Size: {companyData?.basics?.size || "N/A"}</li>
            <li>Compute Nodes: {companyData?.infra?.compute || "0"}</li>
            <li>Storage size: {companyData?.infra?.storage || "0"}</li>
            <li>Traffic Density: {companyData?.infra?.traffic || "N/A"}</li>
          </ul>
        </div>

        {/* Static Recommendations */}
        <div style={card}>
          <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Optimization Recommendations</h2>
          <ul style={{ lineHeight: "2", fontSize: "13px", paddingLeft: "20px", margin: 0 }}>
            {recommendations.length === 0 ? (
              <li>Infrastructure is well optimized 👍</li>
            ) : (
              recommendations.map((rec, index) => <li key={index}>💡 {rec}</li>)
            )}
          </ul>
        </div>

      </div>

      {/* AI CLOUD ARCHITECT ADVISOR CARD */}
      <div style={{ ...card, border: "2px solid #a855f7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px" }}>🤖 AI Cloud Architect</h2>
            <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#64748b" }}>
              Deep automated insights based on your exact cloud metadata profile.
            </p>
          </div>
          <button
            onClick={fetchAiReport}
            disabled={generatingAI}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: generatingAI ? "#ccc" : "#a855f7",
              color: "white",
              cursor: generatingAI ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {generatingAI ? "Thinking... ⏳" : "Ask AI Architect ✨"}
          </button>
        </div>

        {aiReport && (
          <div
            style={{
              marginTop: "20px",
              background: "rgba(168, 85, 247, 0.08)",
              padding: "20px",
              borderRadius: "10px",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            <ReactMarkdown>{aiReport}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
