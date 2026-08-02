import express from 'express';
import { generateArchitectReport, simulateWhatIfScenario } from '../services/aiAdvisor.js';

const router = express.Router();

router.post('/generate-report', async (req, res) => {
  try {
    const { companyData, awsData } = req.body;
    
    if (!companyData) {
      return res.status(400).json({ error: "No company data provided" });
    }
    
    const markdownReport = await generateArchitectReport(companyData, awsData);
    
    res.json({ report: markdownReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/simulate-scenario', async (req, res) => {
  try {
    const { companyData, simulationParameters } = req.body;
    
    if (!companyData || !simulationParameters) {
      return res.status(400).json({ error: "Required payloads missing" });
    }
    
    const simulationResult = await simulateWhatIfScenario(companyData, simulationParameters);
    
    res.json({ report: simulationResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
