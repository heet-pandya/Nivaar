import express from "express";
import { registerCompany, loginCompany } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth route working 🚀" });
});


router.post("/register", registerCompany);
router.post("/login", loginCompany);

export default router;
