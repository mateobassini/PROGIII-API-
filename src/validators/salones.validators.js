import { body } from "express-validator";
export const salonCreate = [
  body("titulo").isString().notEmpty(),
  body("direccion").isString().notEmpty(),
  body("latitud").optional({ nullable: true }).isFloat().toFloat(),
  body("longitud").optional({ nullable: true }).isFloat().toFloat(),
  body("capacidad").optional({ nullable: true }).isInt().toInt(),
  body("importe").isFloat().toFloat(),
];
export const salonUpdate = salonCreate;
