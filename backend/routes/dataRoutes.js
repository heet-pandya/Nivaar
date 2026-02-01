import express from "express";
import { saveQuestionnaire, getLatestQuestionnaire } from "../controllers/dataController.js";

const router = express.Router();

router.post("/questionnaire", saveQuestionnaire);
router.get("/questionnaire/:companyId", getLatestQuestionnaire )

export default router;
