import { buscarTurnosParaRecordatorio } from "./turnos.repo.js";

export async function obtenerTurnosParaRecordatorio(hours) {
  return await buscarTurnosParaRecordatorio(hours);
}
