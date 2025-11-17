import jwt from "jsonwebtoken";

export function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      if (!required) return next();
      return res.status(401).json({ message: "No autenticado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded debe tener: usuario_id, tipo_usuario, nombre, apellido, nombre_usuario
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
}
