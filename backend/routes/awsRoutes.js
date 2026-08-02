import express from 'express';
import { getAWSBillingData } from '../services/awsCostExplorer.js';

const router = express.Router();

router.get('/billing', async (req, res) => {
  try {
    // We pass generic dates for now, this could be dynamic from frontend query params
    const startDate = "2024-03-01";
    const endDate = "2024-03-31";
    
    const data = await getAWSBillingData(startDate, endDate);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
