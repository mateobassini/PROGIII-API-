import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import salonesRoutes from "./routes/salones.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import turnosRoutes from "./routes/turnos.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import cronRoutes from "./routes/cron.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger
const swaggerDocument = YAML.load(
  new URL("./docs/swagger.yaml", import.meta.url)
);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/salones", salonesRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/turnos", turnosRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/cron", cronRoutes);

// Health
app.get("/health", (req, res) =>
  res.json({ ok: true, at: new Date().toISOString() })
);

// Error handler (last)
app.use(errorHandler);

export default app;
