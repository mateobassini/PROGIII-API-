import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import { sendReminders } from "../controllers/reminders.controller.js";

const r = Router();
// Protegido para admin; se ejecuta desde un cron del server
r.get("/send-reminders", auth(), requireRole(3), sendReminders);
export default r;
