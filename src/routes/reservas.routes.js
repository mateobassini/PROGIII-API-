import { Router } from "express";
import * as ctrl from "../controllers/reservas.controller.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import { reservaCreate } from "../validators/reservas.validators.js";
import { validate } from "../middlewares/validate.js";

const r = Router();
r.get("/", auth(), requireRole(1, 2, 3), ctrl.list); 
r.post("/", auth(), requireRole(1, 2, 3), reservaCreate, validate, ctrl.create);
r.put("/:id", auth(), requireRole(3), ctrl.update); // solo admin modifica (regla de negocio)
r.delete("/:id", auth(), requireRole(3), ctrl.remove);
export default r;
