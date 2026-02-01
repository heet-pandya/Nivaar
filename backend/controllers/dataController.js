import Infrastructure from "../models/Infrastructure.js";


// ============================
// SIMPLE REALISTIC OPTIMIZATION ENGINE
// ============================

const calculateOptimization = (data) => {

  const { basics, infra, goals, advanced } = data;

  const spend = Number(basics.spend) || 0;

  const compute = Number(infra.compute) || 0;
  const storage = Number(infra.storage) || 0;

  const totalInfra = compute + storage;

  const traffic = (infra.traffic || "").toLowerCase();

  const performanceIssue = (goals.performance || "").toLowerCase();
  const costIssue = (goals.costIssues || "").toLowerCase();

  const autoScaling = advanced.scaling === "Yes";
  const reserved = advanced.reserved === "Yes";

  let status = "";
  let optimizedSpend = spend;
  let recommendations = [];

  // --------------------------
  // CASE 1 : REDUCE SPEND
  // --------------------------

  if (
    spend > 3000 &&
    totalInfra < 3 &&
    performanceIssue.includes("high") &&
    costIssue.includes("high") &&
    !autoScaling &&
    !reserved
  ) {

    status = "Too Much Spend";

    optimizedSpend = Math.round(spend * 0.7); // reduce by 30%

    recommendations = [
      "Enable auto scaling",
      "Use reserved instances",
      "Right size infrastructure",
      "Reduce unnecessary cloud usage"
    ];
  }

  // --------------------------
  // CASE 3 : NEED MORE INFRA
  // --------------------------

  else if (
    spend < 500 &&
    totalInfra < 3 &&
    performanceIssue.includes("low") &&
    costIssue.includes("low") &&
    !autoScaling &&
    !reserved
  ) {

    status = "Need More Infrastructure";

    optimizedSpend = Math.round(spend * 1.5); // increase by 50%

    recommendations = [
      "Increase compute resources",
      "Improve storage capacity",
      "Adopt scalable cloud services"
    ];
  }

  // --------------------------
  // CASE 2 : OPTIMAL SETUP
  // --------------------------

  else if (
    spend >= 500 &&
    spend <= 3000 &&
    totalInfra >= 3 &&
    totalInfra <= 6 &&
    autoScaling &&
    reserved
  ) {

    status = "Optimal Setup";

    optimizedSpend = spend; // no change

    recommendations = [
      "Infrastructure is well balanced",
      "Continue monitoring costs"
    ];
  }

  // --------------------------
  // DEFAULT SMART BALANCE
  // --------------------------

  else {

    status = "Moderate Optimization Needed";

    optimizedSpend = Math.round(spend * 0.85);

    recommendations = [
      "Review cloud resource usage",
      "Optimize cost where possible"
    ];
  }

  const savings = Math.max(spend - optimizedSpend, 0);

  return {
    currentSpend: spend,
    optimizedSpend,
    savings,
    status,
    recommendations
  };
};




// ============================
// SAVE QUESTIONNAIRE
// ============================

export const saveQuestionnaire = async (req, res) => {

  try {

    const { companyId, basics, infra, goals, advanced } = req.body;

    const optimization = calculateOptimization({
      basics,
      infra,
      goals,
      advanced
    });

    const saved = await Infrastructure.create({
      companyId,
      basics,
      infra,
      goals,
      advanced,
      optimization
    });

    res.status(201).json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save questionnaire" });
  }
};
