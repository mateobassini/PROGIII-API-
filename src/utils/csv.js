import { format } from "@fast-csv/format";
export async function toCSVStream(res, rows, filename = "export.csv") {
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  const csvStream = format({ headers: true });
  csvStream.pipe(res);
  rows.forEach((row) => csvStream.write(row));
  csvStream.end();
}
