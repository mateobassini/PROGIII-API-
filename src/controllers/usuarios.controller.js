import { listUsuarios, listClientesActivos } from "../repositories/usuarios.repo.js";

export async function getUsuarios(req, res, next) {
  try {
    const tipo = req.user.tipo_usuario; // 2 empleado, 3 admin

    if (tipo === 2) {
      // empleado → solo clientes
      const clientes = await listClientesActivos();
      return res.json(clientes);
    }

    if (tipo === 3) {
      // admin → todos los usuarios activos
      const usuarios = await listUsuarios();
      return res.json(usuarios);
    }

    return res.status(403).json({ error: "No autorizado para listar usuarios" });
  } catch (error) {
    next(error);
  }
}
