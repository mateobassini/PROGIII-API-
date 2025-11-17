import { Router } from "express";
import { getUsuarios } from "../controllers/usuarios.controller.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = Router();

// Empleado (2) y admin (3) pueden listar
router.get("/", auth(), requireRole(2, 3), getUsuarios);

export default router;