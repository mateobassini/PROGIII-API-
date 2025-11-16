import dotenv from "dotenv";
dotenv.config();
import { pool } from "../src/config/db.js";
import { hashPassword } from "../src/utils/password.js";

const run = async () => {
  const [rows] = await pool.query("SELECT usuario_id, contrasenia FROM usuarios WHERE LENGTH(contrasenia)=32 AND contrasenia REGEXP '^[0-9a-f]{32}$'");
  for(const u of rows){
    const nuevo = await hashPassword("cambiar_contraseña"); // no se conoce el original: política de reseteo
    await pool.query("UPDATE usuarios SET contrasenia=:c WHERE usuario_id=:id", { c: nuevo, id: u.usuario_id });
    console.log("Actualizado usuario", u.usuario_id);
  }
  process.exit(0);
};
run().catch(e=>{ console.error(e); process.exit(1); });
