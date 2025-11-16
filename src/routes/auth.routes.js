import { Router } from "express";
import { login, registerCliente } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
import { validate } from "../middlewares/validate.js";

const r = Router();
r.post("/login", loginValidator, validate, login);
r.post("/register", registerValidator, validate, registerCliente);
export default r;
