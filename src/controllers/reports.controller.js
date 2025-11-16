import { toCSVStream } from "../utils/csv.js";
import { reservasToPDFBuffer } from "../utils/pdf.js";
import * as repo from "../repositories/reservas.repo.js";

export async function reservasCSV(req, res, next) {
  try {
    const rows = await repo.listReservas();
    await toCSVStream(res, rows, "reservas.csv");
  } catch (e) {
    next(e);
  }
}

export async function reservasPDF(req, res, next) {
  try {
    const rows = await repo.listReservas();
    const pdf = await reservasToPDFBuffer(rows, {
      title: "Reporte de Reservas",
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="reservas.pdf"');
    res.send(pdf);
  } catch (e) {
    next(e);
  }
}

export async function statsPorMes(req, res, next) {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const rows = await repo.statsReservasPorMes(year);
    res.json({ year, data: rows });
  } catch (e) {
    next(e);
  }
}
