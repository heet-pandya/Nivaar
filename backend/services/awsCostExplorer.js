import { CostExplorerClient, GetCostAndUsageCommand } from "@aws-sdk/client-cost-explorer";

// We will initialize the client dynamically inside the function
// to ensure process.env variables are fully loaded.

/**
 * Fetches real billing metrics from AWS.
 * If AWS credentials are not yet configured in `.env`, it falls back to realistic MOCK data
 * so the frontend UI does not crash during development.
 */
export const getAWSBillingData = async (startDate, endDate) => {
  // Graceful degradation: Check if AWS keys are provided
  const accessKey = process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (
    !accessKey || 
    !secretKey || 
    accessKey === "your_access_key" || 
    accessKey.trim() === ""
  ) {
    console.warn("⚠️ AWS Credentials missing or using placeholders! Returning MOCK billing data.");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      isMock: true,
      currentSpend: 1250.75, // MOCK data
      predictedSpend: 1400.00,
      currency: "USD",
      servicesBreakdown: [
        { service: "Amazon EC2", cost: 650.00 },
        { service: "Amazon RDS", cost: 320.50 },
        { service: "Amazon S3", cost: 80.25 },
        { service: "AWS Data Transfer", cost: 200.00 }
      ]
    };
  }

  // Real production AWS Logic
  try {
    const client = new CostExplorerClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        ...(process.env.AWS_SESSION_TOKEN && { sessionToken: process.env.AWS_SESSION_TOKEN })
      }
    });

    const command = new GetCostAndUsageCommand({
      TimePeriod: {
        Start: startDate, // e.g., "2024-03-01"
        End: endDate      // e.g., "2024-03-31"
      },
      Granularity: "MONTHLY",
      Metrics: ["UnblendedCost"]
    });

    const response = await client.send(command);
    
    // Parse the AWS response here (Simplified extraction)
    const cost = parseFloat(response.ResultsByTime[0]?.Total?.UnblendedCost?.Amount || "0");
    const currency = response.ResultsByTime[0]?.Total?.UnblendedCost?.Unit || "USD";

    return {
      isMock: false,
      currentSpend: cost,
      predictedSpend: cost, // For real predictions, we will hook AWS Anomaly APIs later
      currency: currency,
      servicesBreakdown: [] // Can be populated with GroupBy parameters in the future
    };

  } catch (error) {
    console.error("❌ Failed to fetch AWS Billing Data:", error.message);
    throw new Error("AWS Billing API Error");
  }
};
