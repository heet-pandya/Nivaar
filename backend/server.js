import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import awsRoutes from "./routes/awsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/aws", awsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/integrations", integrationRoutes);


app.get("/", (req, res) => {
  res.send("Nivaar Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ status: "Backend API working perfectly 🚀" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
