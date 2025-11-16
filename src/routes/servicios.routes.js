import { Router } from "express";
import * as ctrl from "../controllers/servicios.controller.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const r = Router();
r.get("/", ctrl.list);
r.get("/:id", ctrl.get);
r.post("/", auth(), requireRole(2, 3), ctrl.create);
r.put("/:id", auth(), requireRole(2, 3), ctrl.update);
r.delete("/:id", auth(), requireRole(2, 3), ctrl.remove);
export default r;
