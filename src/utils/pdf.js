import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function reservasToPDFBuffer(reservas, meta = {}) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const title = meta.title || "Reporte de Reservas";
  const pageMargin = 40;

  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  let { width, height } = page.getSize();
  let y = height - pageMargin;

  const drawHeader = () => {
    page.drawText(title, {
      x: pageMargin,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 22;
    page.drawText(`Generado: ${new Date().toLocaleString()}`, {
      x: pageMargin,
      y,
      size: 10,
      font,
    });
    y -= 16;
    const headers = [
      "ID",
      "Fecha",
      "Salón",
      "Usuario",
      "Turno",
      "Temática",
      "Imp. Salón",
      "Imp. Total",
    ];
    page.drawText(headers.join(" | "), { x: pageMargin, y, size: 10, font });
    y -= 10;
    page.drawLine({
      start: { x: pageMargin, y },
      end: { x: width - pageMargin, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    y -= 8;
  };

  drawHeader();

  for (const r of reservas) {
    const line = [
      String(r.reserva_id),
      String(r.fecha_reserva).slice(0, 10),
      r.salon || "",
      r.usuario || "",
      r.turno || "",
      r.tematica || "",
      r.importe_salon?.toFixed
        ? r.importe_salon.toFixed(2)
        : String(r.importe_salon || ""),
      r.importe_total?.toFixed
        ? r.importe_total.toFixed(2)
        : String(r.importe_total || ""),
    ].join(" | ");
    if (y < 60) {
      page = pdfDoc.addPage([595.28, 841.89]);
      ({ width, height } = page.getSize());
      y = height - pageMargin;
      drawHeader();
    }
    page.drawText(line, { x: pageMargin, y, size: 9, font });
    y -= 12;
  }

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
