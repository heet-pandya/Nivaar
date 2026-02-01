import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questionnaire({ darkMode, companyData, setCompanyData }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);
  
  const page = {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "system-ui, sans-serif",
  };

  const card = {
    width: "100%",
    maxWidth: "650px",
    background: darkMode ? "rgba(15,23,42,0.92)" : "#ffffff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
    color: darkMode ? "white" : "#111827",
  };

  const input = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    marginBottom: "18px",
    outline: "none",
  };

  const btn = {
    padding: "13px 28px",
    borderRadius: "12px",
    border: "none",
    background: "#5f7cff",
    color: "white",
    cursor: "pointer",
  };

  const secondary = {
    ...btn,
    background: "#e5e7eb",
    color: "#111827",
  };

  // =========================
  // SAVE QUESTIONNAIRE
  // =========================

  const finishSetup = async () => {
    try {
      const company = JSON.parse(localStorage.getItem("company"));

      if (!company || !company.id) {
        alert("Company not logged in properly");
        return;
      }

      console.log("Sending:", {
        companyId: company.id,
        basics: companyData.basics,
        infra: companyData.infra,
        goals: companyData.goals,
        advanced: companyData.advanced
      });

      const res = await fetch("http://localhost:5000/api/data/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyId: company.id,
          basics: companyData.basics,
          infra: companyData.infra,
          goals: companyData.goals,
          advanced: companyData.advanced
        })
      });

      const data = await res.json();

if (!res.ok) {
  throw new Error("Save failed");
}

// 👉 IMPORTANT: Update frontend state with backend response
setCompanyData({
  basics: data.basics,
  infra: data.infra,
  goals: data.goals,
  advanced: data.advanced,
  optimization: data.optimization
});

navigate("/dashboard");

    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Failed to save questionnaire data");
    }
  };

  return (
    <div style={page}>
      <div style={card}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Company Cloud Basics</h2>

            <input
              style={input}
              placeholder="Company Size"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  basics: { ...companyData.basics, size: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Cloud Provider"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  basics: { ...companyData.basics, provider: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Monthly Cloud Spend"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  basics: { ...companyData.basics, spend: Number(e.target.value) },
                })
              }
            />

            <input
              style={input}
              placeholder="Currency (USD or INR)"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  basics: {
                    ...companyData.basics,
                    currency: e.target.value.toUpperCase(),
                  },
                })
              }
            />

            <button style={btn} onClick={next}>Continue →</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Infrastructure Usage</h2>

            <input
              type="number"
              style={input}
              placeholder="Number of Servers"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  infra: { ...companyData.infra, compute: e.target.value },
                })
              }
            />

            <input
              type="number"
              style={input}
              placeholder="Storage in GB/TB"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  infra: { ...companyData.infra, storage: e.target.value },
                })
              }
            />

            <select
  style={input}
  onChange={(e) =>
    setCompanyData({
      ...companyData,
      infra: { ...companyData.infra, traffic: e.target.value },
    })
  }
>
  <option value="">Select Traffic</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>


            <div style={{ display: "flex", gap: "12px" }}>
              <button style={secondary} onClick={back}>← Back</button>
              <button style={btn} onClick={next}>Continue →</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2>Goals & Challenges</h2>

            <input
              style={input}
              placeholder="Cost Challenges"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  goals: { ...companyData.goals, costIssues: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Performance Issues"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  goals: { ...companyData.goals, performance: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Expected Growth %"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  goals: { ...companyData.goals, growth: e.target.value },
                })
              }
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={secondary} onClick={back}>← Back</button>
              <button style={btn} onClick={next}>Continue →</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2>Advanced Setup</h2>

            <input
              style={input}
              placeholder="Monitoring Tools"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  advanced: { ...companyData.advanced, monitoring: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Auto Scaling Enabled?"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  advanced: { ...companyData.advanced, scaling: e.target.value },
                })
              }
            />

            <input
              style={input}
              placeholder="Reserved Instances Used?"
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  advanced: { ...companyData.advanced, reserved: e.target.value },
                })
              }
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={secondary} onClick={back}>← Back</button>
              <button style={btn} onClick={finishSetup}>
                Finish Setup 🚀
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
