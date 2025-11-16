import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[PROGIII] API running on http://localhost:${PORT}`);
  console.log(`[PROGIII] Swagger UI on http://localhost:${PORT}/api/docs`);
});
