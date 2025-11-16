import { body } from "express-validator";
export const reservaCreate = [
  body("fecha_reserva").isISO8601().toDate(),
  body("salon_id").isInt().toInt(),
  body("usuario_id").isInt().toInt(),
  body("turno_id").isInt().toInt(),
  body("foto_cumpleaniero").optional({ nullable: true }).isString(),
  body("tematica").optional({ nullable: true }).isString(),
  body("importe_salon").optional({ nullable: true }).isFloat().toFloat(),
  body("importe_total").optional({ nullable: true }).isFloat().toFloat(),
  body("servicios").optional().isArray(),
];
