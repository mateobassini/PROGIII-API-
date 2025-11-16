import { body } from "express-validator";

export const loginValidator = [
  body("nombre_usuario")
    .isString()
    .notEmpty()
    .withMessage("nombre_usuario requerido"),
  body("contrasenia")
    .isString()
    .notEmpty()
    .withMessage("contrasenia requerida"),
];

export const registerValidator = [
  body("nombre").isString().notEmpty(),
  body("apellido").isString().notEmpty(),
  body("nombre_usuario").isEmail().withMessage("usar email válido"),
  body("contrasenia").isLength({ min: 6 }),
];
