import { Router } from "express";
import * as ctrl from "../controllers/salones.controller.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";
import { salonCreate, salonUpdate } from "../validators/salones.validators.js";
import { validate } from "../middlewares/validate.js";

const r = Router();
r.get("/", auth(false), ctrl.list);
r.get("/:id", auth(false), ctrl.get);
r.post("/", auth(), requireRole(2, 3), salonCreate, validate, ctrl.create);
r.put("/:id", auth(), requireRole(2, 3), salonUpdate, validate, ctrl.update);
r.delete("/:id", auth(), requireRole(2, 3), ctrl.remove);
export default r;
