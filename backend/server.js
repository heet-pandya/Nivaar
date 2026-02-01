import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);


app.get("/", (req,res)=>{
  res.send("Nivaar Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ status: "Backend API working perfectly 🚀" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
