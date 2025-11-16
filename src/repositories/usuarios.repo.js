import { pool } from "../config/db.js";

export async function findByUsername(nombre_usuario) {
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE nombre_usuario = :nombre_usuario AND activo = 1",
    { nombre_usuario }
  );
  return rows[0] || null;
}

export async function createUsuario(data) {
  const [res] = await pool.query(
    `INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo)
     VALUES (:nombre, :apellido, :nombre_usuario, :contrasenia, :tipo_usuario, :celular, :foto, 1)`,
    data
  );
  return { usuario_id: res.insertId, ...data };
}

export async function listUsuarios() {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE activo = 1");
  return rows;
}

export async function softDeleteUsuario(id) {
  await pool.query("UPDATE usuarios SET activo = 0 WHERE usuario_id = :id", {
    id,
  });
}

export async function updateUsuario(id, data) {
  const fields = [];
  const params = { id };
  for (const [k, v] of Object.entries(data)) {
    fields.push(`${k} = :${k}`);
    params[k] = v;
  }
  if (!fields.length) return await listUsuarios();
  await pool.query(
    `UPDATE usuarios SET ${fields.join(
      ", "
    )}, modificado=NOW() WHERE usuario_id=:id AND activo=1`,
    params
  );
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE usuario_id=:id",
    { id }
  );
  return rows[0] || null;
}
