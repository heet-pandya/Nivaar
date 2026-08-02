import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK.
// It relies on standard environment variable: GEMINI_API_KEY
let ai = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({});
  }
} catch (e) {
  console.warn("⚠️ Google GenAI initialization failed, verify GEMINI_API_KEY is correct.");
}

/**
 * Analyzes infrastructure data and returns an AI Architect report.
 * Uses graceful mock fallback if API keys are missing.
 */
export const generateArchitectReport = async (companyData, cloudData) => {
  // Graceful Mock if no API key is provided
  if (!process.env.GEMINI_API_KEY || !ai) {
    console.warn("⚠️ GEMINI_API_KEY not found in .env! Returning MOCK AI Report.");
    
    // Simulate thinking delay so the UI shows the "Generating..." state
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `### 🤖 Mock AI Cloud Architect Report
*Notice: This is a placeholder report. To get deep, real-time insights, add your \`GEMINI_API_KEY\` to your backend server's environment variables.*

Based on your infrastructure profile and the attached cloud billing data, here are 3 actionable insights:
1. **Enable Compute Optimizer:** You are over-provisioning your instances. Scale down your non-production servers to a \`t3.micro\` footprint.
2. **Implement Auto-Scaling:** You expect high traffic growth, but auto-scaling is currently disabled. This is causing your performance bottlenecks.
3. **Commit to Reserved Instances:** You have stable servers. Switching to 1-year reserved instances will cut your compute bill by ~30% immediately.`;
  }

  // Real Production LLM call
  try {
    const prompt = `
You are an Expert Cloud Architect working as a consultant. Review the following self-reported infrastructure data for a client:
${JSON.stringify(companyData, null, 2)}

And compare it with their actual live Cloud Provider Billing Data (this could be AWS, Azure, GCP, or mock data if keys are missing):
${JSON.stringify(cloudData || {}, null, 2)}

Provide a concise, highly actionable 3-point list written in Markdown format explaining exactly what they should optimize based on both their "performance/cost" goals, their self-reported infrastructure, and the actual billing data. Note any major discrepancies between their reported spend and actual cloud spend.
Be highly professional, sharp, tailored, confident, and cloud-agnostic where appropriate.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("❌ Failed to generate AI Report:", error.message);
    throw new Error("AI Generation Failed");
  }
};

/**
 * Simulates a "What-If" cloud infrastructure scenario using Gemini 2.5 Flash.
 */
export const simulateWhatIfScenario = async (companyData, simulationParameters) => {
  // Graceful Mock if no API key is provided
  if (!process.env.GEMINI_API_KEY || !ai) {
    console.warn("⚠️ GEMINI_API_KEY not found in .env! Returning MOCK Simulation Report.");
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const { computeFootprint, commitmentLevel, dbMigration } = simulationParameters;
    const computeVal = parseFloat(computeFootprint) || 0;
    
    // Calculate mock savings based on sliders
    let savingsPct = 0;
    if (computeVal < 0) savingsPct += Math.abs(computeVal) * 0.75; // scaling down compute directly cuts bill
    if (commitmentLevel === "reserved") savingsPct += 32; // reserved commit cuts baseline
    if (dbMigration === "yes") savingsPct += 15; // managed db savings
    
    const mockCurrent = Number(companyData?.basics?.spend) || 1250;
    const mockOptimized = Math.max(50, Math.round(mockCurrent * (1 - savingsPct / 100)));
    const mockSavings = mockCurrent - mockOptimized;

    return `### 🧪 What-If Cost Simulation (MOCK RUN)
*Notice: This is a placeholder simulation report. Add your \`GEMINI_API_KEY\` to get tailored live cost model suggestions.*

#### 📊 Projected Monthly Cloud Bill
* **Current Estimated Baseline Spend:** $${mockCurrent.toFixed(2)}/mo
* **Projected Post-Optimization Spend:** $${mockOptimized.toFixed(2)}/mo
* **Estimated Monthly Savings:** **$${mockSavings.toFixed(2)}/mo (~${Math.round(savingsPct)}% savings)**

#### 🎯 Strategic Engineering Breakdown
1. **Compute Footprint adjustment (${computeVal}%):** Adjusting your servers by ${computeVal}% directly impacts operational base pricing.
2. **Commitment Strategy (${commitmentLevel}):** Committing to ${commitmentLevel === "reserved" ? "Reserved Instances (Savings Plans)" : "On-Demand"} locks in ${commitmentLevel === "reserved" ? "32%" : "0%"} savings on fixed workloads.
3. **Database Migration to Managed SQL (${dbMigration}):** Migrating databases yields a ${dbMigration === "yes" ? "15%" : "0%"} management overhead reduction.

#### 💡 Implementation Steps:
* If resizing: Terminate smaller idle instances first before changing sizing classes.
* Purchase Compute Savings Plans directly inside your AWS console.`;
  }

  // Real LLM call
  try {
    const { computeFootprint, commitmentLevel, dbMigration } = simulationParameters;

    const prompt = `
You are an expert FinOps and Cloud Capacity Architect.
Analyze the company's current cloud setup:
${JSON.stringify(companyData || {}, null, 2)}

And simulate their target "What-If" architectural changes:
1. Sizing Footprint Adjustment: ${computeFootprint}% (e.g. -30% means they are scaling down compute by 30%, +50% means expanding).
2. Commitment Model: ${commitmentLevel} (options: "reserved" [Reserved Instances / Savings Plans] or "ondemand" [On-demand pricing]).
3. Database Migration to Managed Services: ${dbMigration} (options: "yes" [migrate databases to high-density managed engines] or "no").

Using your deep knowledge of cloud pricing models (AWS, GCP, Azure), provide a professional cost projection in Markdown.
You MUST estimate:
- A realistic Current Baseline Spend (in USD)
- A projected Post-Optimization Spend (in USD)
- An estimated monthly savings (in USD and as a percentage)

Provide a sharp, 3-point bulleted breakdown detailing exactly how these changes will affect performance, scalability, and baseline costs. Detail any potential caveats (e.g., locking into a 3-year plan restricts scaling agility, resizing can trigger service disruption if not managed gracefully).
Make your tone confident, highly technical, and extremely actionable. Keep it concise.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("❌ Failed to generate What-If simulation:", error.message);
    throw new Error("What-If Simulation Failed");
  }
};
