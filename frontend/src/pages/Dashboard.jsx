import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ darkMode, companyData }) {

  const USD_TO_INR = 83;

  const currency = companyData.basics.currency || "USD";

  // ============================
  // USE BACKEND OPTIMIZATION DATA
  // ============================

  const optimization = companyData.optimization || {
    currentSpend: 0,
    optimizedSpend: 0,
    savings: 0,
    recommendations: [],
    status: ""
  };

  // Convert currency only once
  const currentSpend =
    currency === "INR"
      ? optimization.currentSpend * USD_TO_INR
      : optimization.currentSpend;

  const optimizedSpend =
    currency === "INR"
      ? optimization.optimizedSpend * USD_TO_INR
      : optimization.optimizedSpend;

  const savings =
    currency === "INR"
      ? optimization.savings * USD_TO_INR
      : optimization.savings;

  const recommendations = optimization.recommendations || [];

  const format = (value) =>
    currency === "INR"
      ? `₹${value.toFixed(0)}`
      : `$${value.toFixed(0)}`;

  const chartData = [
    { name: "Current", cost: currentSpend },
    { name: "Optimized", cost: optimizedSpend },
  ];

  const card = {
    background: darkMode
      ? "rgba(15,23,42,0.9)"
      : "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    color: darkMode ? "white" : "#111827",
  };

  return (
    <div style={{ padding: "60px", fontFamily: "'Inter', system-ui, sans-serif" }}>

      <h1 style={{ marginBottom: "20px" }}>
        Cloud Optimization Dashboard 
      </h1>

      {/* STATUS */}
      <h3 style={{ marginBottom: "40px", color: "#6366f1" }}>
        Status: {optimization.status}
      </h3>

      {/* METRICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          marginBottom: "50px",
        }}
      >
        <div style={card}>
          <h3>Current Spend</h3>
          <h2>{format(currentSpend)}</h2>
        </div>

        <div style={card}>
          <h3>Optimized Spend</h3>
          <h2>{format(optimizedSpend)}</h2>
        </div>

        <div style={card}>
          <h3>Estimated Savings</h3>
          <h2>{format(savings)}</h2>
        </div>
      </div>

      {/* CHART */}
      <div style={{ ...card, marginBottom: "50px" }}>
        <h2 style={{ marginBottom: "20px" }}>Cost Comparison</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* INFRA SUMMARY */}
      <div style={{ ...card, marginBottom: "40px" }}>
        <h2>Infrastructure Summary</h2>

        <ul style={{ lineHeight: "2" }}>
          <li>Cloud Provider: {companyData.basics.provider}</li>
          <li>Company Size: {companyData.basics.size}</li>
          <li>Compute: {companyData.infra.compute}</li>
          <li>Storage: {companyData.infra.storage}</li>
          <li>Traffic: {companyData.infra.traffic}</li>
        </ul>
      </div>

      {/* OPTIMIZATION INSIGHTS */}
      <div style={card}>
        <h2>Optimization Recommendations</h2>

        <ul style={{ lineHeight: "2" }}>
          {recommendations.length === 0 ? (
            <li>Infrastructure looks well optimized 👍</li>
          ) : (
            recommendations.map((rec, index) => (
              <li key={index}>💡 {rec}</li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}
