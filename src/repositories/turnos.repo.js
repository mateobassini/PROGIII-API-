import { pool } from "../config/db.js";

export async function getTurnos() {
  const [rows] = await pool.query("SELECT * FROM turnos");
  return rows;
}

export async function getTurnosByUser(userId) {
  const [rows] = await pool.query("SELECT * FROM turnos WHERE usuario_id = ?", [
    userId,
  ]);
  return rows;
}

export async function getTurnoById(id) {
  const [rows] = await pool.query("SELECT * FROM turnos WHERE id = ?", [id]);
  return rows[0];
}

export async function createTurno(data) {
  const { usuario_id, salon_id, fecha_reserva, hora_reserva } = data;
  const [result] = await pool.query(
    `INSERT INTO turnos (usuario_id, salon_id, fecha_reserva, hora_reserva)
     VALUES (?, ?, ?, ?)`,
    [usuario_id, salon_id, fecha_reserva, hora_reserva]
  );
  return result.insertId;
}

export async function updateTurno(id, data) {
  const { fecha_reserva, hora_reserva } = data;
  const [result] = await pool.query(
    `UPDATE turnos SET fecha_reserva=?, hora_reserva=? WHERE id=?`,
    [fecha_reserva, hora_reserva, id]
  );
  return result.affectedRows > 0;
}

export async function deleteTurno(id) {
  const [result] = await pool.query("DELETE FROM turnos WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function buscarTurnosParaRecordatorio(hours) {
  const [rows] = await pool.query(
    `
    SELECT r.fecha_reserva, u.nombre_usuario AS email
    FROM reservas r
    JOIN usuarios u ON u.usuario_id = r.usuario_id
    WHERE r.activo = 1
      AND r.fecha_reserva BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL :hours HOUR)
    `,
    { hours }
  );
  return rows;
}
