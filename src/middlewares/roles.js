/**
 * tipo_usuario: 1=cliente, 2=empleado, 3=admin (según dump de ejemplo)
 */
export function requireRole(...allowed) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "No autenticado" });
    if (!allowed.includes(user.tipo_usuario)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
}
