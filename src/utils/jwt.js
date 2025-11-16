import jwt from "jsonwebtoken";
export function signJwt(user) {
  const payload = {
    usuario_id: user.usuario_id,
    nombre: user.nombre,
    apellido: user.apellido,
    tipo_usuario: user.tipo_usuario,
    nombre_usuario: user.nombre_usuario,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "8h",
  });
}
