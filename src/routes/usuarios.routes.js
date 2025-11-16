import { Router } from "express";
import { getUsuarios } from "../controllers/usuarios.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getUsuarios);

export default router;
