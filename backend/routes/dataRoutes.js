import express from "express";
import { saveQuestionnaire, getLatestQuestionnaire } from "../controllers/dataController.js";

const router = express.Router();

router.post("/questionnaire", saveQuestionnaire);
router.get("/latest/:companyId", getLatestQuestionnaire);

export default router;
