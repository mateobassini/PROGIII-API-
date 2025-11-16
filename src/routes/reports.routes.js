import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import {
  reservasCSV,
  reservasPDF,
  statsPorMes,
} from "../controllers/reports.controller.js";

const r = Router();
r.get("/reservas.csv", auth(), requireRole(3), reservasCSV);
r.get("/reservas.pdf", auth(), requireRole(3), reservasPDF);
r.get("/stats/por-mes", auth(), requireRole(3), statsPorMes);
export default r;
