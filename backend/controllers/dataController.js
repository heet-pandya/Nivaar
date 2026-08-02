import { supabase } from "../config/supabaseClient.js";


// ============================
// SIMPLE REALISTIC OPTIMIZATION ENGINE
// ============================

const calculateOptimization = (data) => {
  const { basics, infra, goals, advanced } = data;

  // 1. Standardize ALL backend numbers to USD for uniform decision-making
  const currency = (basics.currency || "").toUpperCase();
  let rawSpend = Number(basics.spend) || 0;
  const spend = currency === "INR" ? Math.round(rawSpend / 83) : rawSpend;

  const compute = Number(infra.compute) || 0;
  const storage = Number(infra.storage) || 0;
  const traffic = (infra.traffic || "").toLowerCase();

  const performanceIssue = (goals.performance || "").toLowerCase();
  const costIssue = (goals.costIssues || "").toLowerCase();
  const growth = Number(goals.growth) || 0;

  const autoScaling = advanced.scaling && advanced.scaling.toLowerCase().includes("yes");
  const reserved = advanced.reserved && advanced.reserved.toLowerCase().includes("yes");

  let status = "";
  let optimizedSpend = spend;
  let recommendations = [];

  // ============================
  // PRECISE SOLUTION LOGIC
  // ============================

  // Analyze the signals provided from the advanced Questionnaire
  const needsPerformanceInjection =
    performanceIssue.includes("high") ||
    performanceIssue.includes("yes") ||
    growth >= 20 ||
    traffic === "high";

  const needsCostReduction =
    costIssue.includes("high") ||
    costIssue.includes("yes") ||
    (!reserved && spend > 1000);

  // CASE A: Require Investment (Growth > Efficiency)
  if (needsPerformanceInjection && compute < 10 && !autoScaling) {
    status = "Infrastructure Investment Required";
    optimizedSpend = Math.round(spend * 1.35); // Spend must go UP by 35% to meet goals
    recommendations = [
      "Enable Auto-Scaling groups immediately to handle high traffic spikes.",
      "Increase compute footprint to accommodate your >20% growth trajectory.",
      "Upgrade underlying instances to compute-optimized classes to fix performance bottlenecks."
    ];
  }
  // CASE B: Maximum Savings (Efficiency > Growth)
  else if (needsCostReduction && !reserved && compute >= 2) {
    status = "High Savings Potential";
    optimizedSpend = Math.round(spend * 0.70); // Spend goes DOWN by 30%
    recommendations = [
      "Purchase Reserved Instances or Compute Savings Plans to slash base compute costs.",
      "Terminate over-provisioned or idle 'zombie' servers.",
      "Migrate stale object storage to cheaper tier classes (like Glacier)."
    ];
  }
  // CASE C: Fully Optimized / Gold Standard
  else if (autoScaling && reserved && !needsPerformanceInjection) {
    status = "Highly Optimized";
    optimizedSpend = spend; // PERFECT
    recommendations = [
      "Your infrastructure is well-architected for your current traffic.",
      "Continue daily budget tracking.",
      "You are maximizing ROI with auto-scaling and reserved instances."
    ];
  }
  // CASE D: Moderate Drift
  else {
    status = "Moderate Drift Identified";
    optimizedSpend = Math.round(spend * 0.90); // 10% saving
    recommendations = [
      "Review historical logs to identify minor idle resources.",
      "Consider containerizing monolithic workloads for better density."
    ];
  }

  // Savings can be negative if investment is required
  const savings = spend - optimizedSpend;

  // The backend now stores purely USD standardized data
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

    const { data: saved, error: insertError } = await supabase
      .from("infrastructures")
      .insert([
        {
          company_id: companyId,
          basics,
          infra,
          goals,
          advanced,
          optimization
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    // ============================
    // GAMIFICATION: AUTOMATIC BADGING
    // ============================
    try {
      const newBadges = ["FinOps Explorer"];
      
      if (optimization.savings > 0) {
        newBadges.push("Zombie Slayer");
      }
      if (advanced.scaling && advanced.scaling.toLowerCase().includes("yes")) {
        newBadges.push("Auto-Scaling Dynamo");
      }
      if (advanced.reserved && advanced.reserved.toLowerCase().includes("yes")) {
        newBadges.push("Reserved Committer");
      }

      // Fetch current badges
      const { data: companyRecord } = await supabase
        .from("companies")
        .select("badges")
        .eq("id", companyId)
        .maybeSingle();

      let mergedBadges = newBadges;
      if (companyRecord && Array.isArray(companyRecord.badges)) {
        mergedBadges = Array.from(new Set([...companyRecord.badges, ...newBadges]));
      }

      // Update in database
      await supabase
        .from("companies")
        .update({ badges: mergedBadges })
        .eq("id", companyId);

    } catch (badgeErr) {
      console.error("⚠️ Failed to award badges gracefully:", badgeErr.message);
    }

    res.status(201).json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save questionnaire" });
  }
};

// GET LATEST QUESTIONNAIRE
export const getLatestQuestionnaire = async (req, res) => {
  try {
    const { companyId } = req.params;

    const { data: latest, error } = await supabase
      .from("infrastructures")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!latest) {
      return res.status(200).json({
        basics: {},
        infra: {},
        goals: {},
        advanced: {},
        optimization: {}
      });
    }

    res.json(latest);
  } catch (err) {
    console.error("Failed to fetch latest questionnaire:", err.message);
    res.status(500).json({ error: "Failed to fetch questionnaire data" });
  }
};
