import { pool } from "../config/db.js";

export async function listSalones() {
  const [rows] = await pool.query(
    "SELECT * FROM salones WHERE activo = 1 ORDER BY salon_id DESC"
  );
  return rows;
}

export async function getSalon(id) {
  const [rows] = await pool.query(
    "SELECT * FROM salones WHERE salon_id = :id AND activo = 1",
    { id }
  );
  return rows[0] || null;
}

export async function createSalon(data) {
  const [res] = await pool.query(
    `INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo)
     VALUES (:titulo, :direccion, :latitud, :longitud, :capacidad, :importe, 1)`,
    data
  );
  return { salon_id: res.insertId, ...data };
}

export async function updateSalon(id, data) {
  await pool.query(
    `UPDATE salones SET
      titulo=:titulo, direccion=:direccion, latitud=:latitud, longitud=:longitud,
      capacidad=:capacidad, importe=:importe, modificado=NOW()
     WHERE salon_id=:id AND activo=1`,
    { id, ...data }
  );
  return await getSalon(id);
}

export async function softDeleteSalon(id) {
  await pool.query("UPDATE salones SET activo=0 WHERE salon_id=:id", { id });
}
