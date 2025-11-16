import { pool } from "../config/db.js";

export async function listServicios() {
  const [rows] = await pool.query(
    "SELECT * FROM servicios WHERE activo = 1 ORDER BY servicio_id DESC"
  );
  return rows;
}

export async function getServicio(id) {
  const [rows] = await pool.query(
    "SELECT * FROM servicios WHERE servicio_id = :id AND activo = 1",
    { id }
  );
  return rows[0] || null;
}

export async function createServicio(data) {
  const [res] = await pool.query(
    `INSERT INTO servicios (descripcion, importe, activo)
     VALUES (:descripcion, :importe, 1)`,
    data
  );
  return { servicio_id: res.insertId, ...data };
}

export async function updateServicio(id, data) {
  await pool.query(
    `UPDATE servicios SET descripcion=:descripcion, importe=:importe, modificado=NOW()
     WHERE servicio_id=:id AND activo=1`,
    { id, ...data }
  );
  return await getServicio(id);
}

export async function softDeleteServicio(id) {
  await pool.query("UPDATE servicios SET activo=0 WHERE servicio_id=:id", {
    id,
  });
}
