import express from "express";
import { saveQuestionnaire } from "../controllers/dataController.js";

const router = express.Router();

router.post("/questionnaire", saveQuestionnaire);


export default router;
