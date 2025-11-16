import {
  findByUsername,
  createUsuario,
} from "../repositories/usuarios.repo.js";
import { verifyPassword, hashPassword } from "../utils/password.js";
import { signJwt } from "../utils/jwt.js";
import { validationResult } from "express-validator";

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { nombre_usuario, contrasenia } = req.body;
    const user = await findByUsername(nombre_usuario);
    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });
    const ok = await verifyPassword(contrasenia, user.contrasenia);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });
    const token = signJwt(user);
    res.json({
      token,
      user: {
        usuario_id: user.usuario_id,
        nombre: user.nombre,
        apellido: user.apellido,
        tipo_usuario: user.tipo_usuario,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function registerCliente(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const data = req.body;
    const hashed = await hashPassword(data.contrasenia);
    const created = await createUsuario({
      ...data,
      contrasenia: hashed,
      tipo_usuario: 1,
    });
    res.status(201).json({ usuario_id: created.usuario_id });
  } catch (e) {
    next(e);
  }
}
