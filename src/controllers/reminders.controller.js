import { obtenerTurnosParaRecordatorio } from "../repositories/reminders.repo.js";
import { enviarMail } from "../services/mail.service.js";

export async function sendReminders(req, res, next) {
  try {
    const hours = Number(req.query.hours ?? 24);

    const turnos = await obtenerTurnosParaRecordatorio(hours);

    for (const turno of turnos) {
      await enviarMail(
        turno.email,
        "Recordatorio de reserva",
        `Hola, recordamos su reserva para el día ${turno.fecha_reserva}`
      );
    }

    res.json({
      message: "Recordatorios enviados",
      count: turnos.length,
    });
  } catch (error) {
    next(error);
  }
}
