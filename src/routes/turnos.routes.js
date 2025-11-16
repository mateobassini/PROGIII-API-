import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  obtenerTurnos,
  obtenerTurno,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} from "../controllers/turnos.controller.js";

const router = Router();

router.get("/", auth, obtenerTurnos);

//detalle
router.get("/:id", auth, obtenerTurno);

//crear
router.post("/", auth, crearTurno);

//actualizar
router.put("/:id", auth, actualizarTurno);

//eliminar
router.delete("/:id", auth, eliminarTurno);

export default router;
