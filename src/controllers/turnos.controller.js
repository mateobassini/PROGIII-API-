import {
  getTurnos,
  getTurnoById,
  createTurno,
  updateTurno,
  deleteTurno,
  getTurnosByUser,
} from "../repositories/turnos.repo.js";

export async function obtenerTurnos(req, res, next) {
  try {
    const { tipo_usuario, usuario_id } = req.user;

  if (tipo_usuario === 3) {
    turnos = await getTurnos();
  } else {
    turnos = await getTurnosByUser(usuario_id);
  }

    res.json(turnos);
  } catch (error) {
    next(error);
  }
}

export async function obtenerTurno(req, res, next) {
  try {
    const turno = await getTurnoById(req.params.id);
    if (!turno) return res.status(404).json({ message: "Turno no encontrado" });
    res.json(turno);
  } catch (error) {
    next(error);
  }
}

export async function crearTurno(req, res, next) {
  try {
    const id = await createTurno(req.body);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
}

export async function actualizarTurno(req, res, next) {
  try {
    const actualizado = await updateTurno(req.params.id, req.body);
    res.json({ actualizado });
  } catch (error) {
    next(error);
  }
}

export async function eliminarTurno(req, res, next) {
  try {
    const eliminado = await deleteTurno(req.params.id);
    res.json({ eliminado });
  } catch (error) {
    next(error);
  }
}
