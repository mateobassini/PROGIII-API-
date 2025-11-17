import { obtenerTurnosParaRecordatorio } from "../repositories/reminders.repo.js";
import { enviarMail } from "../services/mail.service.js";

export async function sendReminders(req, res, next) {
  try {
    const hours = Number(req.query.hours ?? 24);

    const turnos = await obtenerTurnosParaRecordatorio(hours);

    for (const turno of turnos) {
      await enviarMail({
        to: turno.email,
        subject: "Recordatorio de reserva",
        html: `
          <h3>Recordatorio de reserva</h3>
          <p>Hola, te recordamos tu reserva para el día <b>${turno.fecha_reserva}</b>.</p>
        `,
      });
    }

    res.json({
      message: "Recordatorios enviados",
      count: turnos.length,
    });
  } catch (error) {
    next(error);
  }
}
