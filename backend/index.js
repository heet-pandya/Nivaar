// 1. Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 2. Initialize dotenv
dotenv.config();

// 3. Create Express app
const app = express();

// 4. Middlewares
app.use(cors());
app.use(express.json());

//Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


// 5. Port configuration
const PORT = process.env.PORT || 5000;

// 6. Test route (health check)
app.get("/", (req, res) => {
  res.send("Cloud Cost Optimizer Backend is Running 🚀");
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
