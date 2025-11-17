import { pool } from "../config/db.js";

export async function listReservas() {
  const [rows] = await pool.query(`
    SELECT r.*, s.titulo AS salon, u.nombre AS usuario, t.orden AS turno_orden
    FROM reservas r
    JOIN salones s ON s.salon_id = r.salon_id
    JOIN usuarios u ON u.usuario_id = r.usuario_id
    JOIN turnos t ON t.turno_id = r.turno_id
    WHERE r.activo = 1
    ORDER BY r.reserva_id DESC`);
  return rows;
}

export async function listReservasByUser(usuario_id) {
  const [rows] = await pool.query(
    `
    SELECT r.*, s.titulo AS salon, t.orden AS turno_orden
    FROM reservas r
    JOIN salones s ON s.salon_id = r.salon_id
    JOIN turnos t ON t.turno_id = r.turno_id
    WHERE r.activo = 1 AND r.usuario_id = :usuario_id
    ORDER BY r.reserva_id DESC
    `,
    { usuario_id }
  );
  return rows;
}

export async function createReserva(data) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query(
      `INSERT INTO reservas (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo)
       VALUES (:fecha_reserva, :salon_id, :usuario_id, :turno_id, :foto_cumpleaniero, :tematica, :importe_salon, :importe_total, 1)`,
      data
    );
    const reserva_id = res.insertId;

    if (Array.isArray(data.servicios)) {
      for (const s of data.servicios) {
        await conn.query(
          `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe)
           VALUES (:reserva_id, :servicio_id, :importe)`,
          { reserva_id, servicio_id: s.servicio_id, importe: s.importe }
        );
      }
    }
    await conn.commit();
    return { reserva_id, ...data };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function getReserva(id) {
  const [rows] = await pool.query(
    "SELECT * FROM reservas WHERE reserva_id=:id AND activo=1",
    { id }
  );
  return rows[0] || null;
}

export async function updateReserva(id, data) {
  await pool.query(
    `UPDATE reservas SET
      fecha_reserva=:fecha_reserva, salon_id=:salon_id, usuario_id=:usuario_id, turno_id=:turno_id,
      foto_cumpleaniero=:foto_cumpleaniero, tematica=:tematica, importe_salon=:importe_salon, importe_total=:importe_total,
      modificado=NOW()
     WHERE reserva_id=:id AND activo=1`,
    { id, ...data }
  );
  return await getReserva(id);
}

export async function softDeleteReserva(id) {
  await pool.query("UPDATE reservas SET activo=0 WHERE reserva_id=:id", { id });
}

export async function statsReservasPorMes(year) {
  const [rows] = await pool.query("CALL sp_reservas_por_mes(:yr)", {
    yr: year,
  });
  // mysql returns [ [rows], [meta], ... ]
  return rows[0] || [];
}
