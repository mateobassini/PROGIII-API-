import { pool } from "../config/db.js";
export async function getUsuarios(req, res) {
  try {
    const rol = req.user.rol;

    let query = "";

    if (rol === "empleado") {
      //empleado
      query = `
        SELECT id, nombre, email, rol, activo
        FROM usuarios
        WHERE rol = 'cliente' AND activo = 1
      `;
    } else if (rol === "admin") {
      //admin
      query = `
        SELECT id, nombre, email, rol, activo
        FROM usuarios
        WHERE activo = 1
      `;
    } else {
      return res.status(403).json({
        error: "No autorizado para listar usuarios",
      });
    }

    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
