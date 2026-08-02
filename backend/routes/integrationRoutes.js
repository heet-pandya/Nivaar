import express from "express";
import { supabase } from "../config/supabaseClient.js";

const router = express.Router();

// SAVE SLACK WEBHOOK URL
router.post("/webhook", async (req, res) => {
  try {
    const { companyId, webhookUrl } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const { error } = await supabase
      .from("companies")
      .update({ slack_webhook: webhookUrl })
      .eq("id", companyId);

    if (error) {
      throw error;
    }

    res.json({ status: "success", message: "Slack Webhook saved successfully ✅" });
  } catch (err) {
    console.error("Failed to save webhook:", err.message);
    res.status(500).json({ error: "Failed to save webhook" });
  }
});

// TRIGGER TEST SLACK ALREADY / COST SPIKE ALERT
router.post("/test-slack", async (req, res) => {
  try {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    // Retrieve company and webhook from Supabase
    const { data: company, error: fetchError } = await supabase
      .from("companies")
      .select("company_name, slack_webhook")
      .eq("id", companyId)
      .single();

    if (fetchError || !company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (!company.slack_webhook) {
      return res.status(400).json({ error: "No Slack Webhook configured for this company" });
    }

    // Insert an anomaly alert row in the database
    const { error: anomalyError } = await supabase
      .from("anomalies")
      .insert([
        {
          company_id: companyId,
          metric_name: "Amazon EC2 / Cost Spike Anomaly",
          cost_spike: 480.50,
          description: "EC2 daily spend jumped by 320% due to un-terminated GPU-based g5.xlarge instance in region us-east-1."
        }
      ]);

    if (anomalyError) {
      console.error("Failed to save anomaly record:", anomalyError.message);
    }

    // Prepare Slack Blocks payload
    const slackPayload = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚨 Cloud Cost Anomaly Alert 🚨",
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Company:* ${company.company_name}\n*Status:* Action Required immediately!`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "*Resource:* Amazon EC2 (us-east-1)"
            },
            {
              type: "mrkdwn",
              text: "*Daily Cost Spike:* +$480.50"
            },
            {
              type: "mrkdwn",
              text: "*Anomalous Growth:* +320%"
            },
            {
              type: "mrkdwn",
              text: "*Estimated Monthly Impact:* +$14,415.00"
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🔍 *Detail:* Spikes detected in GPU instance footprints. An idle `g5.xlarge` instance was left running without CPU traffic for 48 consecutive hours."
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🔗 *Action Required:* <http://localhost:5173/dashboard|*Click here to Open Dashboard 🚀*>"
          }
        }
      ]
    };

    // Send payload to Slack Webhook
    const response = await fetch(company.slack_webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload)
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with status ${response.status}`);
    }

    res.json({ status: "success", message: "Test Alert dispatched to your Slack channel successfully! 🚀" });

  } catch (err) {
    console.error("Failed to send Slack alert:", err.message);
    res.status(500).json({ error: "Failed to dispatch Slack alert. Please check your Webhook URL." });
  }
});

// GET COMPANY PROFILE (BADGES & WEBHOOK)
router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: company, error } = await supabase
      .from("companies")
      .select("id, company_name, email, slack_webhook, badges")
      .eq("id", id)
      .single();

    if (error || !company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (err) {
    console.error("Failed to fetch profile:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
