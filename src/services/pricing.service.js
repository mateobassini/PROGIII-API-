import { pool } from "../config/db.js";

/**
 * Calcula el importe del salón + suma importes de servicios (por ID)
 * @param {number} salon_id
 * @param {Array<{servicio_id:number}>} servicios
 * @returns {Promise<{importe_salon:number, importe_servicios:number, importe_total:number, serviciosDetallados:any[], salon_titulo:string}>}
 */
export async function calcularTotales(salon_id, servicios = []) {
  // Importe de salón
  const [[salon]] = await pool.query(
    "SELECT importe, titulo FROM salones WHERE salon_id=:id AND activo=1",
    { id: salon_id }
  );
  if (!salon)
    throw Object.assign(new Error("Salón no encontrado o inactivo"), {
      status: 400,
    });
  const importe_salon = Number(salon.importe);
  // Traer importes actuales de cada servicio para evitar manipulación del cliente
  let importe_servicios = 0;
  const serviciosDetallados = [];
  for (const s of Array.isArray(servicios) ? servicios : []) {
    const [[serv]] = await pool.query(
      "SELECT servicio_id, descripcion, importe FROM servicios WHERE servicio_id=:id AND activo=1",
      { id: s.servicio_id }
    );
    if (serv) {
      importe_servicios += Number(serv.importe);
      serviciosDetallados.push(serv);
    }
  }
  const importe_total = importe_salon + importe_servicios;
  return {
    importe_salon,
    importe_servicios,
    importe_total,
    serviciosDetallados,
    salon_titulo: salon.titulo,
  };
}
