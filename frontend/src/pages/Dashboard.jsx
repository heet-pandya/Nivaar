import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ darkMode, companyData }) {

  const USD_TO_INR = 83; // fixed rate for now

  const currency = companyData.basics.currency || "USD";

  let currentSpendUSD = companyData.basics.spend || 0;

  let currentSpend =
    currency === "INR" ? currentSpendUSD * USD_TO_INR : currentSpendUSD;

  let optimizedSpend = currentSpend * 0.75;
  let savings = currentSpend - optimizedSpend;

  const format = (value) =>
    currency === "INR"
      ? `₹${value.toFixed(0)}`
      : `$${value.toFixed(0)}`;

  // 🧠 Smart Optimization Rules
  const recommendations = [];

  if (currentSpendUSD > 5000) {
    recommendations.push("Use Reserved Instances to save ~20%");
  }

  if (
    companyData.infra.traffic &&
    companyData.infra.traffic.toLowerCase().includes("high")
  ) {
    recommendations.push("Enable Auto Scaling for peak traffic");
  }

  if (
    companyData.infra.storage &&
    companyData.infra.storage.toLowerCase().includes("tb")
  ) {
    recommendations.push("Optimize storage with lifecycle policies");
  }

  if (
    companyData.goals.growth &&
    Number(companyData.goals.growth) > 30
  ) {
    recommendations.push("Adopt scalable cloud architecture");
  }

  if (recommendations.length === 0) {
    recommendations.push("Your infrastructure looks well optimized 👍");
  }

  const chartData = [
    { name: "Current", cost: currentSpend },
    { name: "Optimized", cost: optimizedSpend },
  ];

  const card = {
  background: darkMode
    ? "rgba(15,23,42,0.9)"
    : "rgba(255,255,255,0.95)",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  color: darkMode ? "white" : "#111827",
  width: "100%",
};


  return (
    <div style={{ padding: "60px", fontFamily: "'Inter', system-ui, sans-serif" }}>

      <h1 style={{ marginBottom: "40px" }}>
        Cloud Optimization Dashboard ({currency})
      </h1>

      {/* Metrics */}
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

      {/* Chart */}
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

      {/* Infrastructure Summary */}
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

      {/* Optimization Insights */}
      <div style={card}>
        <h2>Optimization Recommendations</h2>

        <ul style={{ lineHeight: "2" }}>
          {recommendations.map((rec, index) => (
            <li key={index}>💡 {rec}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
