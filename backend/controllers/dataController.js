import { supabase } from "../config/supabaseClient.js";

// In-memory cache for questionnaire data if database is unreachable
const memoryInfrastructures = new Map();

// ============================
// SIMPLE REALISTIC OPTIMIZATION ENGINE
// ============================

const calculateOptimization = (data) => {
  const { basics = {}, infra = {}, goals = {}, advanced = {} } = data;

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

  const needsPerformanceInjection =
    performanceIssue.includes("high") ||
    performanceIssue.includes("yes") ||
    growth >= 20 ||
    traffic === "high";

  const needsCostReduction =
    costIssue.includes("high") ||
    costIssue.includes("yes") ||
    (!reserved && spend > 1000);

  // CASE A: Require Investment
  if (needsPerformanceInjection && compute < 10 && !autoScaling) {
    status = "Infrastructure Investment Required";
    optimizedSpend = Math.round(spend * 1.35);
    recommendations = [
      "Enable Auto-Scaling groups immediately to handle high traffic spikes.",
      "Increase compute footprint to accommodate your >20% growth trajectory.",
      "Upgrade underlying instances to compute-optimized classes to fix performance bottlenecks."
    ];
  }
  // CASE B: Maximum Savings
  else if (needsCostReduction && !reserved && compute >= 2) {
    status = "High Savings Potential";
    optimizedSpend = Math.round(spend * 0.70);
    recommendations = [
      "Purchase Reserved Instances or Compute Savings Plans to slash base compute costs.",
      "Terminate over-provisioned or idle 'zombie' servers.",
      "Migrate stale object storage to cheaper tier classes (like Glacier)."
    ];
  }
  // CASE C: Fully Optimized
  else if (autoScaling && reserved && !needsPerformanceInjection) {
    status = "Highly Optimized";
    optimizedSpend = spend;
    recommendations = [
      "Your infrastructure is well-architected for your current traffic.",
      "Continue daily budget tracking.",
      "You are maximizing ROI with auto-scaling and reserved instances."
    ];
  }
  // CASE D: Moderate Drift
  else {
    status = "Moderate Drift Identified";
    optimizedSpend = Math.round(spend * 0.90);
    recommendations = [
      "Review historical logs to identify minor idle resources.",
      "Consider containerizing monolithic workloads for better density."
    ];
  }

  const savings = spend - optimizedSpend;

  return {
    currentSpend: spend,
    optimizedSpend,
    savings,
    status,
    recommendations
  };
};

// SAVE QUESTIONNAIRE
export const saveQuestionnaire = async (req, res) => {
  try {
    const { companyId, basics = {}, infra = {}, goals = {}, advanced = {} } = req.body;

    const optimization = calculateOptimization({
      basics,
      infra,
      goals,
      advanced
    });

    const record = {
      company_id: companyId,
      basics,
      infra,
      goals,
      advanced,
      optimization,
      created_at: new Date().toISOString()
    };

    let saved = null;

    try {
      const { data: dbSaved, error: insertError } = await supabase
        .from("infrastructures")
        .insert([record])
        .select()
        .single();

      if (!insertError && dbSaved) {
        saved = dbSaved;
      }
    } catch (dbErr) {
      console.warn("⚠️ Supabase save unavailable, storing in memory:", dbErr.message);
    }

    if (!saved) {
      saved = { id: "infra_" + Date.now(), ...record };
    }

    memoryInfrastructures.set(companyId, saved);

    return res.status(201).json(saved);

  } catch (err) {
    console.error("Save questionnaire error:", err);
    return res.status(500).json({ error: "Failed to save questionnaire" });
  }
};

// GET LATEST QUESTIONNAIRE
export const getLatestQuestionnaire = async (req, res) => {
  try {
    const { companyId } = req.params;

    let latest = null;

    try {
      const { data: dbLatest, error } = await supabase
        .from("infrastructures")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && dbLatest) {
        latest = dbLatest;
      }
    } catch (dbErr) {
      console.warn("⚠️ Supabase fetch unavailable, checking memory:", dbErr.message);
    }

    if (!latest && memoryInfrastructures.has(companyId)) {
      latest = memoryInfrastructures.get(companyId);
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

    return res.json(latest);
  } catch (err) {
    console.error("Failed to fetch latest questionnaire:", err.message);
    return res.status(500).json({ error: "Failed to fetch questionnaire data" });
  }
};
