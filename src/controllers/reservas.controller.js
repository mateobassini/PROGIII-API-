import * as repo from "../repositories/reservas.repo.js";
import * as usuariosRepo from "../repositories/usuarios.repo.js";
import { validationResult } from "express-validator";
import { calcularTotales } from "../services/pricing.service.js";
import { enviarMail } from "../services/mail.service.js";

export async function list(req, res, next) {
  try {
    let reservas;

    // cliente
    if (req.user.tipo_usuario === 1) {
      reservas = await repo.listReservasByUser(req.user.id_usuario);
    }
    // admin
    else {
      reservas = await repo.listReservas();
    }

    res.json(reservas);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { salon_id, servicios = [], ...rest } = req.body;

    // calcular importes
    const totales = await calcularTotales(salon_id, servicios);

    const created = await repo.createReserva({
      ...rest,
      salon_id,
      servicios,
      ...totales,
    });

    // notificaciones
    try {
      // envío a cliente
      await enviarMail({
        to: req.user?.nombre_usuario,
        subject: `Reserva confirmada`,
        html: mailTemplateReservaCreada(totales, rest.fecha_reserva),
      });

      // envío a admins
      const admins = await usuariosRepo.listAdminsActivos();
      for (const admin of admins) {
        await enviarMail({
          to: admin.nombre_usuario,
          subject: `Nueva reserva creada`,
          html: mailTemplateAvisoAdmin(totales),
        });
      }
    } catch (_) {}

    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { salon_id, servicios = [], ...rest } = req.body;

    let data = { ...rest };

    if (salon_id || servicios.length) {
      const totales = await calcularTotales(
        salon_id || rest.salon_id,
        servicios
      );
      data = { ...data, salon_id: salon_id || rest.salon_id, ...totales };
    }

    const updated = await repo.updateReserva(id, data);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    await repo.softDeleteReserva(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

function mailTemplateReservaCreada(tot, fecha) {
  return `
    <h3>Reserva creada</h3>
    <p>Salón: <b>${tot.salon_titulo}</b></p>
    <p>Fecha: <b>${fecha}</b></p>
    <p>Total: <b>$${tot.importe_total.toFixed(2)}</b></p>
  `;
}

function mailTemplateAvisoAdmin(tot) {
  return `
    <p>Se creó una nueva reserva.</p>
    <p>Salón: <b>${tot.salon_titulo}</b></p>
    <p>Total: <b>$${tot.importe_total.toFixed(2)}</b></p>
  `;
}
