import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Soporta contraseñas legacy en MD5 (no recomendado) y bcrypt moderno.
 */
export async function verifyPassword(plain, hash) {
  try {
    if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
      return await bcrypt.compare(plain, hash);
    }
    // legacy md5 fallback (32 hex)
    const md5 = crypto.createHash("md5").update(plain).digest("hex");
    return md5 === hash;
  } catch (e) {
    return false;
  }
}

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plain, salt);
}
