import { body } from "express-validator";
export const usuarioCreate = [
  body("nombre").isString().notEmpty(),
  body("apellido").isString().notEmpty(),
  body("nombre_usuario").isEmail(),
  body("contrasenia").isLength({ min: 6 }),
  body("tipo_usuario").isInt({ min: 1, max: 3 }).toInt(),
  body("celular").optional().isString(),
  body("foto").optional().isString(),
];
export const usuarioUpdate = [
  body("nombre").optional().isString().notEmpty(),
  body("apellido").optional().isString().notEmpty(),
  body("nombre_usuario").optional().isEmail(),
  body("contrasenia").optional().isLength({ min: 6 }),
  body("tipo_usuario").optional().isInt({ min: 1, max: 3 }).toInt(),
  body("celular").optional().isString(),
  body("foto").optional().isString(),
];
